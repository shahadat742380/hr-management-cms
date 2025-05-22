import { env } from "@/config/env";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  baseURL: `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth`,
  plugins: [nextCookies()],
});
