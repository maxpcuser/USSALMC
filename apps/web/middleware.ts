import { NextRequest, NextFetchEvent } from 'next/server';
import { redirect } from 'next/navigation';

export function middleware(request: NextRequest, event: NextFetchEvent) {
  // Apply middleware logic if needed
}

export const config = {
  matcher: [
    '/discovery/:path*',
  ],
};