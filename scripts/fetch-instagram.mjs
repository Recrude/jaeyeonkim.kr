// Fetch Instagram media into data/instagram.json + data/ig/ images.
// Zero-dependency, Node 20+. Requires IG_ACCESS_TOKEN env var
// (Instagram API with Instagram Login, scope: instagram_business_basic).
//
// Image files are downloaded into the repo because the CDN URLs the API
// returns are signed and expire after a few days.

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const TOKEN = process.env.IG_ACCESS_TOKEN;
if (!TOKEN) {
  console.error('IG_ACCESS_TOKEN is not set.');
  process.exit(1);
}

const API = 'https://graph.instagram.com';
const FIELDS =
  'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,' +
  'children{id,media_type,media_url,thumbnail_url}';
const ROOT = new URL('..', import.meta.url).pathname;
const IMG_DIR = path.join(ROOT, 'data', 'ig');
const JSON_PATH = path.join(ROOT, 'data', 'instagram.json');

async function getJSON(url) {
  const res = await fetch(url);
  const body = await res.json();
  if (!res.ok || body.error) {
    throw new Error(`API error: ${JSON.stringify(body.error ?? body)}`);
  }
  return body;
}

async function fetchAllMedia() {
  const media = [];
  let url = `${API}/me/media?fields=${FIELDS}&limit=50&access_token=${TOKEN}`;
  while (url && media.length < 500) {
    const page = await getJSON(url);
    media.push(...page.data);
    url = page.paging?.next;
  }
  return media;
}

// Downloads to data/ig/<name> unless the file already exists (media is
// immutable on Instagram, so existing files are never re-fetched).
async function download(srcUrl, name) {
  const file = path.join(IMG_DIR, name);
  if (existsSync(file)) return false;
  const res = await fetch(srcUrl);
  if (!res.ok) throw new Error(`download failed (${res.status}): ${name}`);
  await writeFile(file, Buffer.from(await res.arrayBuffer()));
  return true;
}

function imageName(id, mediaType) {
  return `${id}${mediaType === 'VIDEO' ? '-thumb' : ''}.jpg`;
}

const posts = [];
let downloaded = 0;
await mkdir(IMG_DIR, { recursive: true });

for (const m of await fetchAllMedia()) {
  const post = {
    id: m.id,
    type: m.media_type,
    caption: m.caption ?? '',
    permalink: m.permalink,
    timestamp: m.timestamp,
    images: [],
  };
  const children =
    m.media_type === 'CAROUSEL_ALBUM' && m.children ? m.children.data : [m];
  for (const c of children) {
    const src = c.media_type === 'VIDEO' ? c.thumbnail_url : c.media_url;
    if (!src) continue;
    const name = imageName(c.id, c.media_type);
    try {
      if (await download(src, name)) downloaded++;
      post.images.push({ file: `ig/${name}`, video: c.media_type === 'VIDEO' });
    } catch (e) {
      console.error(`skipping ${name}: ${e.message}`);
    }
  }
  posts.push(post);
}

posts.sort((a, b) => b.timestamp.localeCompare(a.timestamp));

const previous = existsSync(JSON_PATH)
  ? JSON.parse(await readFile(JSON_PATH, 'utf8')).posts.length
  : 0;
await writeFile(
  JSON_PATH,
  JSON.stringify({ fetchedAt: new Date().toISOString(), posts }, null, 1)
);
console.log(
  `${posts.length} posts (was ${previous}), ${downloaded} new images downloaded.`
);
