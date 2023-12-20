import methodNotAllowed from "./middlewares/methodNotAllowed";
import log from "./middlewares/log";
import knex from "knex";
import knexfile from "../../knexfile.mjs";
import BaseModel from "@/db/models/BaseModel";
import PostsModel from "@/db/models/PostsModel";
import { HTTP_ERRORS } from "@/api/constants"
import { NotFoundError as ObjectionNotFoundError } from "objection";
import { NotFoundError, PublicError } from "./errrors";

const mw = (handlers) => async (req, res) => {
    const middlewares = handlers[req.method]
    const sanitizedMiddlewares = [log, ...(middlewares || [methodNotAllowed])]
    let currentMiddlewareIndex = 0
    const db = knex(knexfile)
    
    BaseModel.knex(db)
    
    const ctx = {
        db,
        models:{
            PostsModel
        },
        req,
        res,
        next: async () => {
            const middleware = sanitizedMiddlewares[currentMiddlewareIndex]
            currentMiddlewareIndex += 1
            
            await middleware(ctx)
        },
    }
    
    try {
        await ctx.next()
    } catch (err) {
        const error =
        err instanceof ObjectionNotFoundError ? new NotFoundError() : err
        
        if (!(error instanceof PublicError)) {
            console.error(error)
            
            res
            .status(HTTP_ERRORS.INTERNAL_SERVER_ERROR)
            .send({ error: "Something went wrong." })
            
            return
        }
        
        if (error instanceof NotFoundError) {
            res.status(HTTP_ERRORS.NOT_FOUND).send({ error })
            
            return
        }
        
        res.status(HTTP_ERRORS.CLIENT_ERROR).send({ error })
    }
}


export default mw