import { HTTP_ERRORS, HTTP_SUCCESS } from "../../../api/constants"
import mw from "../../../api/mw"
import { pageValidators } from "@/utils/validators"
import { validate } from "@/api/middlewares/validate"
import auth from "@/api/middlewares/auth"
const handle = mw({
    GET: [
        auth,
        validate({
            query:{
                page: pageValidators.optional()
            }}),
            async ({
                models: { PostsModel },
                req: {
                    query: 
                    { title },
                },
                res,
            }) => {
                const selectedPosts = await PostsModel.query().select("id").where("title", title)
                const posts = await PostsModel.query().findById(selectedPosts[0].id).withGraphFetched("user")
                
                if(!posts) {
                    res.status(HTTP_ERRORS.NOT_FOUND).send({ error: "Not Found"})
                }

                res.status(HTTP_SUCCESS.OK).send({result: posts})
            }
        ],
        PATCH: [
            auth,
            async ({
                models: { PostsModel },
                req: {
                    body,
                    query: { title },
                },
                res,
            }) => {
                const postId = await PostsModel.query().select("id").where("title", title)
                
                if(!postId) {
                    res.status(HTTP_ERRORS.NOT_FOUND).send({ error: "Not Found"})
                    
                    return 
                }

                const updatedPosts = await PostsModel.query().patchAndFetchById(
                    postId[0].id,
                    {
                        title: body.title,
                        content: body.content,
                        updatedAt: "NOW()"
                    }
                    )
                    res.status(HTTP_SUCCESS.OK).send(updatedPosts)
                },
            ],
            DELETE: [
                auth,
                async ({
                    models: { PostsModel, CommentsModel },
                    req: {
                        query: 
                        { title },
                    },
                    res,
                }) => {
                    const postsId = title
                    const posts = await PostsModel.query().findById(postsId).throwIfNotFound()
                    
                    if(!posts) {
                        res.status(HTTP_ERRORS.NOT_FOUND).send({ error: "Not Found"})
                        
                        return
                    }
                    
                    await PostsModel.query().deleteById(postsId)
                    const comments = await CommentsModel.query().where("postId", postsId)

                    if (comments) {
                        await CommentsModel.query().where("postId", postsId).del()
                    }

                    res.status(HTTP_SUCCESS.OK).send("Posts has been deleted")
                }
            ]
        })
        
        export default handle