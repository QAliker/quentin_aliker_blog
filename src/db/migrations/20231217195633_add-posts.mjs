export const up = async (db) => {
    await db.schema.createTable("posts", (table) => {
        table.increments("id");
        // table.integer("userId");
        table.string("title");
        table.text("content");
        table.timestamp('created_at', { useTz: true });
        table.timestamp('updated_at', { useTz: true });
        // ajouter les not null apres , unique pour les title content
    })
}

export const down = async (db) => {
    await db.schema.dropTable("posts")
}