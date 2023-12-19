import methodNotAllowed from "./middlewares/methodNotAllowed";
import log from "./middlewares/log";
import knex from "knex";
import knexfile from "../../knexfile.mjs";

const mw = (handlers) => async (req, res) => {
    const middlewares = handlers[req.method]
    const sanitizedMiddlewares = [log, ...(middlewares || [methodNotAllowed])]
    let currentMiddlewareIndex = 0
    const db = knex(knexfile)
    const ctx = {
        db,
        req,
        res,
        next: async () => {
            const middleware = sanitizedMiddlewares[currentMiddlewareIndex]
            currentMiddlewareIndex += 1
            
            await middleware(ctx)
        },
    }
    
    await ctx.next()
}

export default mw