import { faker } from "@faker-js/faker";


export const seed = async (db) => {
    await db("posts").delete()
    const posts = await db("posts")
    .insert(
        [... new Array(30)].map(() => ({
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraphs(10),
            created_at: "NOW()",
            updated_at: "NOW()"
        }))
        )
        await db("users").delete()
        await db("users").insert(
            [...Array(5)].map(() => ({
                email: faker.internet.email(),
                passwordHash: "alskdjalsdkjasdlkj",
                passwordSalt: "alskdjalsdkjasdlkj",
            })),
            )
        }