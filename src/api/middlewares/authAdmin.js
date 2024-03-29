import { ForbiddenError } from "../errrors"
import config from "@/config"
import jsonwebtoken from "jsonwebtoken"

const authAdmin = async (ctx) => {
    const {
        req: {
            cookies: { [config.security.jwt.cookieName]: sessionToken },
        },
        next,
    } = ctx
    
    try {
        const { payload } = jsonwebtoken.verify(
            sessionToken,
            config.security.jwt.secret,
            )
            
            ctx.session = payload
            
            await next()
        } catch (err) {
            throw new ForbiddenError()
        }
    }
    
    export default authAdmin