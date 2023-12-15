import { config } from "dotenv"

config({ path: ".env.local" })

const knexfile = {
    client: "pg",
    connection: process.env.DB__CONNECTION
}