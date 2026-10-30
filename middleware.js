import { next } from '@vercel/functions/middleware';
import { handleAuth, authenticatedPageHeaders } from './server/presentation-auth.mjs';
export const config = { runtime: 'nodejs', matcher: ['/presentations/((?!assets/|slides/|thumbnails/|media/|previews/|decks/).*)', '/api/capture/:path*', '/api/publish/:path*'] };
export default async function middleware(request) {
  const response = await handleAuth(request);
  if (response) return response;
  const path = new URL(request.url).pathname;
  return next({headers: /^\/presentations\/edit(?:\/|$)/.test(path) ? authenticatedPageHeaders : {}});
}
