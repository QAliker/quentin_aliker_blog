import { object, string } from "yup"

const validationSchema = object({
    db: object({
        client: string().oneOf(["pg"]).required(),
        connection: string().required(),
    }).noUnknown(),
}).noUnknown()
const data = {
    db: {
        client: "pg",
        connection: process.env.DB__CONNECTION,
    },
}
const config = (() => {
    try {
        return validationSchema.validateSync(data, {
            stripUnknown: true,
            abortEarly: false,
        })
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
        process.exit(1)
    }
    
    return null
})()

export default config