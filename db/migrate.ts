import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from "postgres";

const queryClient = postgres("postgres://admin:575lMNANcW80pY02r6gAsQcPZQjdludm@dpg-cnaild0l5elc7397aqe0-a.frankfurt-postgres.render.com/final?ssl=true" || '');

const db = drizzle(queryClient);


async function main() {
    console.log('Migrate start...');
    await migrate(db, { migrationsFolder: "drizzle" });
    queryClient.end();
}


try {
    main()
} catch (error) {
    console.log(error);
}