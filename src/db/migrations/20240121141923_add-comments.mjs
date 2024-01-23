export const up = async (db) => {
    await db.schema.createTable("comments", (table) => {
        table.increments("id");
        table.integer("user_id").notNullable();
        table.integer("post_id").notNullable();
        table.text("content").notNullable();
        table.timestamp('created_at', { useTz: true }).notNullable();
    })
}

export const down = async (db) => {
    await db.schema.dropTable("comments")
}