import type { Config } from "drizzle-kit";

export default {
    schema: "./db/schema.ts",
    out: "./drizzle",
    driver: 'pg',
    dbCredentials: {
        connectionString: "postgres://admin:575lMNANcW80pY02r6gAsQcPZQjdludm@dpg-cnaild0l5elc7397aqe0-a.frankfurt-postgres.render.com/demov1?ssl=true",
    }
} satisfies Config;