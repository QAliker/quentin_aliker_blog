export const up = async (db) => {
    await db.schema.createTable("users", (table) => {
        table.increments("id")
        table.string("username").notNullable().unique()
        table.string("email").notNullable().unique()
        table.text("passwordHash").notNullable()
        table.text("passwordSalt").notNullable()
        table.integer("role").notNullable()
    })
}

export const down= async (db) => {
    await db.schema.dropTable("users")
}

