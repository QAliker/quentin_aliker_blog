export const up = async (db) => {
    await db.schema.createTable("users", function (table) {
        table.increments("userId")
        table.string("usersname").notNullable().unique();
        table.string("password").notNullable();
        table.string("email").notNullable();
        table.integer("role").notNullable();
        table.string("status")
    })
}

export const down= async (db) => {
    await db.schema.dropTable("users")
}

