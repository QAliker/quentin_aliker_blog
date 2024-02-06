export const up = async (db) => {
    await db.schema.createTable("comments", (table) => {
        table.increments("id")
        table.integer("userId").notNullable()
        table.integer("postId").notNullable()
        table.text("content").notNullable()
        table.timestamp("createdAt", { useTz: true }).notNullable()
    })
}

export const down = async (db) => {
    await db.schema.dropTable("comments")
}