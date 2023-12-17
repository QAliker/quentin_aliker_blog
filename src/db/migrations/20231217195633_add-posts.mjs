export const up = async (db) => {
    await db.schema.createTable("categories", (table) => {
        table.increments("postId")
    })
}