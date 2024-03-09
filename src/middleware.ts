import { withAuth } from 'next-auth/middleware'

export default withAuth({
    pages: {
        signIn: "/signin"
    },
    callbacks: ({
        authorized(params) {

            // dashboard nur noamle user

            return params.token?.role === "admin"
        },
    })
})

export const config = { matcher: ["/dashboard", "/admin/:path"] }
