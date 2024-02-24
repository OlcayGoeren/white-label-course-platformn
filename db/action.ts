// "use server"

// import { revalidatePath } from "next/cache";
// import z, { ZodError } from "zod";

// import { drizzle } from 'drizzle-orm/postgres-js'
// import postgres, { PostgresError } from 'postgres'

// const scheme = z.object({
//     title: z.string().min(1),
//     artist: z.string().min(1),
//     album: z.string().min(1),
//     duration: z.string().min(1),
// })

// const connectionString = process.env.DATABASE_URL || "";
// const client = postgres(connectionString)
// export const db = drizzle(client);

// export async function createSong(prevState: any, formData: FormData) {
//     try {
//         const parse = scheme.parse({
//             title: formData.get("title"),
//             artist: formData.get("artist"),
//             album: formData.get("album"),
//             duration: formData.get("duration"),
//         })

//         await db.insert(songs).values({
//             title: parse.title,
//             artist: parse.artist,
//             album: parse.album,
//             duration: parse.duration,
//         })

//         return revalidatePath('/form')
//     } catch (e) {
//         const error = e as ZodError

//         if (!error.isEmpty) return error.format()
//     }
// }