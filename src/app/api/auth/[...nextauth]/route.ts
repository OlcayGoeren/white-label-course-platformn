import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt";
import { db } from "../../../../../db/access";
import { authOptions } from "./authoptions";



const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }