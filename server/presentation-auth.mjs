import { createHmac, randomBytes, pbkdf2 as pbkdf2Callback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
const pbkdf2 = promisify(pbkdf2Callback);
const BASE = '/presentations/';
const COOKIE = '__Secure-presentation-edit';
const HOURS = 8;
const failures = new Map();
const privateHeaders = { 'Cache-Control': 'private, no-store', 'X-Robots-Tag': 'noindex, nofollow', 'Vary': 'Cookie', 'Referrer-Policy': 'same-origin' };
export function authSettings() {
  try {
    const value = JSON.parse(process.env.PRESENTATION_AUTH || 'null');
    if (!value || !/^[a-f0-9]{32}$/.test(value.salt) || !/^[a-f0-9]{64}$/.test(value.hash) || !/^[a-f0-9]{64}$/.test(value.sessionKey)) return null;
    return value;
  } catch { return null; }
}
function signature(payload, key) { return createHmac('sha256', Buffer.from(key,'hex')).update('presentation-editor:'+payload).digest('hex'); }
function equal(a,b) { return a.length === b.length && timingSafeEqual(Buffer.from(a),Buffer.from(b)); }
export function sessionValid(request, config, now = Date.now()) {
  if (!config) return false;
  const raw = request.headers.get('cookie')?.split(';').map(s=>s.trim()).find(s=>s.startsWith(COOKIE+'='))?.slice(COOKIE.length+1);
  if (!raw || !/^\d{13}\.[a-f0-9]{32}\.[a-f0-9]{64}$/.test(raw)) return false;
  const [expiry,nonce,sig] = raw.split('.');
  if (Number(expiry) <= now || Number(expiry) > now + HOURS*3600000+60000) return false;
  return equal(sig,signature(expiry+'.'+nonce,config.sessionKey));
}
function cookie(value, age = HOURS*3600) { return `${COOKIE}=${value}; Path=${BASE}; HttpOnly; Secure; SameSite=Strict; Max-Age=${age}`; }
function destination(raw) { return /^\/presentations\/(?:edit(?:\/[a-z0-9-]+)?|migrate)\/?$/.test(raw || '') ? raw : BASE+'edit/'; }
function redirect(to, extra = {}) { return new Response(null,{status:303,headers:{...privateHeaders,Location:to,...extra}}); }
function escape(text) { return text.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function loginPage(next, error = '', status = 200) {
  const html = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>편집 로그인 · Jaeyeon Kim</title><style>
@font-face{font-family:Suisse;src:url('/presentations/assets/suisse-regular.woff') format('woff');font-weight:400;font-display:swap}
*{box-sizing:border-box}body{margin:0;padding:13px 24px;background:#000;color:snow;font:400 24px/1.25 Suisse,'Apple SD Gothic Neo',sans-serif}a{color:inherit}form{margin-top:48px;max-width:480px}label{display:block}input,button{font:inherit;color:inherit;background:none;border:0;border-radius:0}input{display:block;width:100%;padding:12px 0;border-bottom:1px solid #888;margin:12px 0 24px}button{padding:0;cursor:pointer;text-decoration:underline}p{margin:24px 0;color:#aaa}
</style></head><body><a href="/presentations/">Jaeyeon Kim</a><form method="post" action="/presentations/login/"><input type="hidden" name="next" value="${escape(next)}"><label for="password">비밀번호</label><input id="password" name="password" type="password" autocomplete="current-password" required maxlength="128" autofocus><button type="submit">편집 열기</button>${error?`<p role="alert">${error}</p>`:''}</form></body></html>`;
  return new Response(html,{status,headers:{...privateHeaders,'Content-Type':'text/html; charset=utf-8','Content-Security-Policy':"default-src 'none'; style-src 'unsafe-inline'; font-src 'self'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'"}});
}
export async function handleAuth(request) {
  const url = new URL(request.url);
  let path;
  try { path = decodeURIComponent(url.pathname).replace(/\/+/g,'/').replace(/\/+$/,''); }
  catch { return new Response(null,{status:400,headers:privateHeaders}); }
  const editing = /^\/presentations\/edit(?:\/|$)/.test(path) || path === '/presentations/migrate';
  const capture = ['/presentations/api/capture','/api/capture','/presentations/api/publish','/api/publish'].includes(path);
  const login = path === '/presentations/login', logout = path === '/presentations/logout', session = path === '/presentations/auth/session';
  if (!editing && !capture && !login && !logout && !session) return null;
  const config = authSettings();
  if (!config) return new Response('편집 로그인을 준비하고 있습니다. 잠시 후 다시 시도하세요.',{status:503,headers:privateHeaders});
  const authenticated = sessionValid(request,config);
  if (session) return Response.json({authenticated},{headers:privateHeaders});
  if (login) {
    const next = destination(url.searchParams.get('next'));
    if (request.method === 'GET') return authenticated ? redirect(next) : loginPage(next);
    if (request.method !== 'POST') return new Response(null,{status:405,headers:{...privateHeaders,Allow:'GET, POST'}});
    if (request.headers.get('origin') !== url.origin) return new Response(null,{status:403,headers:privateHeaders});
    if (!request.headers.get('content-type')?.startsWith('application/x-www-form-urlencoded') || Number(request.headers.get('content-length')) > 1024) return new Response(null,{status:400,headers:privateHeaders});
    const raw = await request.text();
    if (raw.length > 1024) return new Response(null,{status:400,headers:privateHeaders});
    const form = new URLSearchParams(raw), target = destination(form.get('next'));
    const password = form.get('password') || '';
    // Per-instance throttling supplements the password gate without another storage service.
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const key = url.host+':'+ip, now = Date.now();
    const attempt = failures.get(key);
    if (attempt && attempt.until > now && attempt.count >= 8) return loginPage(target,'잠시 후 다시 시도하세요.',429);
    const hash = password.length <= 128 ? (await pbkdf2(password,Buffer.from(config.salt,'hex'),120000,32,'sha256')).toString('hex') : '';
    if (!equal(hash,config.hash)) {
      if (failures.size > 10000) for (const [key,value] of failures) if (value.until <= now) failures.delete(key);
      failures.set(key,{count:attempt && attempt.until > now ? attempt.count+1 : 1,until:attempt && attempt.until > now ? attempt.until : now+600000});
      return loginPage(target,'비밀번호를 확인하세요.',401);
    }
    failures.delete(key);
    const payload = String(now + HOURS*3600000)+'.'+randomBytes(16).toString('hex');
    return redirect(target,{'Set-Cookie':cookie(payload+'.'+signature(payload,config.sessionKey))});
  }
  if (logout) {
    if (request.method !== 'POST') return new Response(null,{status:405,headers:{...privateHeaders,Allow:'POST'}});
    if (request.headers.get('origin') !== url.origin) return new Response(null,{status:403,headers:privateHeaders});
    return redirect(BASE,{'Set-Cookie':cookie('',0)});
  }
  if (!authenticated) return capture ? new Response('편집 로그인이 필요합니다.',{status:401,headers:privateHeaders}) : redirect(BASE+'login/?next='+encodeURIComponent(destination(url.pathname)));
  return null;
}
export const authenticatedPageHeaders = privateHeaders;
