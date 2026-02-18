"use client";

import { Cookies } from "react-cookie";

export const AUTH_COOKIE = "auth_token";

const cookies = new Cookies();

/**
 * Save auth token
 */
export function setAuthToken(token: string) {
  cookies.set(AUTH_COOKIE, token, {
    path: "/",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

/**
 * Read auth token
 */
export function getAuthToken(): string | null {
  return cookies.get(AUTH_COOKIE) ?? null;
}

/**
 * Clear auth token
 */
export function clearAuthToken() {
  cookies.remove(AUTH_COOKIE, { path: "/" });
}
