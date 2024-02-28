// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"


type role = "admin" | "user" | "owner"

declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            role: role,
            email: string
        } & DefaultSession
    }

    interface User extends DefaultUser {
        id: string,
        role: role,
        email: string
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string,
        role: role,
        email: string
    }
}