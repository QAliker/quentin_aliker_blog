export const up = async (db) => {
    await db.schema.createTable("posts", (table) => {
        table.increments("id");
        table.integer("user_id").notNullable();
        table.string("title").notNullable();
        table.text("content").notNullable();
        table.timestamp('created_at', { useTz: true }).notNullable();
        table.timestamp('updated_at', { useTz: true }).notNullable();
    })
}

export const down = async (db) => {
    await db.schema.dropTable("posts")
}