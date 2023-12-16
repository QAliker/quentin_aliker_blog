import { Faker } from "@faker-js/faker";

export const seed = async (db) => {
    await db("users").insert()
}