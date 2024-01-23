import mw from "../../../api/mw"
import { HTTP_ERRORS } from "../../../api/constants"
import { pageValidators } from "@/utils/validators"
import { validate } from "@/api/middlewares/validate"
import auth from "@/api/middlewares/auth"
const handle = mw({
    GET: [
        validate({
            query:{
                page: pageValidators.optional()
            }}),
            async ({
                res,
                req: {
                    query: { commentsId } ,
                },
                models: { CommentsModel },
            }) => {
                const comments = await CommentsModel.query()
                .where("post_id", commentsId).withGraphFetched("user")
                res.send({ result: comments })
                
            },
        ],
        POST: [
            auth,
            async ({
                models: { CommentsModel },
                req: {
                    body: { content},
                    query: { commentsId }
                },
                res,
                session,
            }) => {
                const comment = await CommentsModel.query()
                .insert({ user_id: session.id , post_id: commentsId, content , created_at: "NOW()"/*, updated_at: "NOW()"*/  })
                res.send("the comment has been inserted in the database", comment)
            },
        ],
    })
    
    export default handle