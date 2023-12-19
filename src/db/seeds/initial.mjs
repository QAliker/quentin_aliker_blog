import { Faker } from "@faker-js/faker";


export const seed = async (db) => {
    await db("posts").delete()
    const categories = await db("posts")
    .insert(
        [... new Array()]
    )
}