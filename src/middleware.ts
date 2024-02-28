import { withAuth } from 'next-auth/middleware'

// export { default } from 'next-auth/middleware'

export default withAuth({
    pages: {
        signIn: "/signin"
    },
    callbacks: ({
        authorized(params) {
            return params.token?.role === "admin"
        },
    })
}
)

export const config = { matcher: ["/dashboard"] }
