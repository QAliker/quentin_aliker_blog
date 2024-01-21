import { HTTP_ERRORS } from "../../../api/constants"
import mw from "../../../api/mw"
import { pageValidators } from "@/utils/validators"
import { validate } from "@/api/middlewares/validate"
import auth from "@/api/middlewares/auth"
const handle = mw({
    GET: [
        // auth,
        validate({
            query:{
                page: pageValidators.optional()
            }}),
            async ({
                models: { PostsModel },
                req: {
                    query: 
                    { postsId },
                },
                res,
            }) => {
                const posts = await PostsModel.query().findById(postsId).withGraphFetched("user")
                
                if(!posts) {
                    res.status(HTTP_ERRORS.NOT_FOUND).send({ error: "Not Found"})
                }
                res.send({result: posts})
            }
        ],
        PATCH: [
            auth,
            async ({
                models: { PostsModel },
                req: {
                    body,
                    query: { postsId },
                },
                res,
            }) => {
                const posts = await PostsModel.query().findById(postsId)
                
                if(!posts) {
                    res.status(HTTP_ERRORS.NOT_FOUND).send({ error: "Not Found"})
                    
                    return 
                }
                const updatedPosts = await PostsModel.query().patchAndFetchById(
                    postsId,
                    {
                        title: body.title,
                        content: body.content,
                        updated_at: "NOW()"
                    }
                    )
                    res.send(updatedPosts)
                },
            ],
            DELETE: [
                auth,
                async ({
                    models: { PostsModel },
                    req: {
                        query: 
                        { postsId },
                    },
                    res,
                }) => {
                    const posts = await PostsModel.query().findById(postsId).throwIfNotFound()
                    
                    if(!posts) {
                        res.status(HTTP_ERRORS.NOT_FOUND).send({ error: "Not Found"})
                        
                        return
                    }
                    const deletedPosts = await PostsModel.query().deleteById(postsId)
                    res.send("Posts has been deleted")
                }
            ]
        })
        
        export default handle