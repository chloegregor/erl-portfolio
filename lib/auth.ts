import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: process.env.NODE_ENV === "production" ? "postgresql" : "sqlite",
    }),
    emailAndPassword: {
        enabled: true,
    },
    plugins: [nextCookies()]
});
