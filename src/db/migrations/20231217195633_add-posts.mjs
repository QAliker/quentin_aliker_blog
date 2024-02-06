export const up = async (db) => {
    await db.schema.createTable("posts", (table) => {
        table.increments("id")
        table.integer("userId").notNullable()
        table.string("title").notNullable()
        table.text("content").notNullable()
        table.integer("views").notNullable()
        table.timestamp("createdAt", { useTz: true }).notNullable()
        table.timestamp("updatedAt", { useTz: true }).notNullable()
    })
}

export const down = async (db) => {
    await db.schema.dropTable("posts")
}