import { faker } from "@faker-js/faker"


export const seed = async (db) => {
    await db("posts").delete()
    await db("posts")
    .insert(
        [... new Array(30)].map(() => ({
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraphs(10),
            user_id: faker.number.int({ min: 1, max: 20}),
            created_at: "NOW()",
            updated_at: "NOW()"
        }))
        )
        await db("users").delete()
        await db("users").insert(
            [...Array(20)].map(() => ({
                username: faker.internet.userName(),
                email: faker.internet.email(),
                passwordHash: "alskdjalsdkjasdlkj",
                passwordSalt: "alskdjalsdkjasdlkj",
                role: faker.number.int({max: 0})
            })),
            )
        await db("comments").delete()
        await db("comments").insert(
            [...Array(40)].map(() => ({
                user_id: faker.number.int({ min: 1, max: 20}),
                post_id: faker.number.int({ min: 1, max: 30}),
                content: faker.lorem.sentence(5),
                created_at: "NOW()",
            })),
            )
        }