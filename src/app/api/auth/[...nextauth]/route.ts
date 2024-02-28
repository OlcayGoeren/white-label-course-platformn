import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt";
import { db } from "../../../../../db/access";


export const authOptions: AuthOptions = {
    pages: {
        signIn: "/signin"
    },
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {},
                password: {}
            },
            async authorize(credentials, req) {
                try {
                    const foundUser = await db.query.user.findFirst({
                        where: (user, { eq }) => eq(user.email, req.body?.email),
                    });

                    if (foundUser) {
                        const result = compareSync(req.body?.password ?? "", foundUser.password);

                        if (result) {
                            return {
                                email: foundUser.email,
                                id: foundUser.id,
                                role: "admin",
                            };
                        } else {
                            throw new Error("Password does not match email");
                        }
                    } else {
                        throw new Error("Email could not be found");
                    }
                } catch (error) {
                    throw error;
                }
            },
        })

    ],
    callbacks: {
        jwt({ token, user, }) {
            if (user) {
                token.role = user.role
            }
            return token
        },
        // session({ session, token }) {
        //     session.user.role = token.role
        //     return session
        // }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }