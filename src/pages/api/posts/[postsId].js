import { HTTP_ERRORS } from "../../../api/constants"
import mw from "../../../api/mw"
import { titleValidators, contentValidators } from "@/utils/validators"
import { validate } from "@/api/middlewares/validate"

const handle = mw({
    GET: [
        validate({
            body: {
                title: titleValidators,
                content: contentValidators
            },
        }),
        async ({
            models: { PostsModel },
            req: {
                query: 
                { postsId },
            },
            res,
        }) => {
            const posts = await PostsModel.query().findById(postsId).throwIfNotFound()
            res.send(posts)
            
            if(!posts) {
                res.status(HTTP_ERRORS.NOT_FOUND).send({ error: "Not Found"})
            }
        }
    ],
    PATCH: [
        async ({
            models: { PostsModel },
            req: {
                body,
                query: 
                { postsId },
            },
            res,
        }) => {
            const posts = await PostsModel.query().findById(postsId)
            res.send(posts)
            
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
                .throwIfNotFound()
                )
                res.send(updatedPosts)
            },
        ],
        DELETE: [
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