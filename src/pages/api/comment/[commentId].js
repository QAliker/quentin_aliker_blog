import mw from "../../../api/mw"
import { HTTP_ERRORS, HTTP_SUCCESS } from "../../../api/constants"
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
                    query: { commentId } ,
                },
                models: { CommentsModel },
            }) => {
                const id = commentId
                const comments = await CommentsModel.query()
                .findById(id)

                if(!comments) {
                    res.status(HTTP_ERRORS.NOT_FOUND).send("Not Found")
                }

                res.status(HTTP_SUCCESS.OK).send({ result: comments })
            },
        ],
        PATCH: [
            auth,
            async ({
                models: { CommentsModel },
                req: {
                    query: commentId,
                    body,
                },
                res,
            }) => {
                const id = commentId.commentId
                const comment = await CommentsModel.query().findById(id)
                
                if(!comment) {
                    res.status(HTTP_ERRORS.NOT_FOUND).send({ error: "Not Found"})
                    
                    return 
                }
                
                const updatedComment = await CommentsModel.query().patchAndFetchById(
                    id,
                    {
                        content: body.content
                    }
                    )
                    res.status(HTTP_SUCCESS.OK).send(updatedComment)
                },
            ],
            DELETE: [
                auth,
                async ({
                    models: { CommentsModel },
                    req: {
                        query: commentId ,
                    },
                    res,
                }) => {
                    const comment = await CommentsModel.query().findById(commentId.commentId).throwIfNotFound()
                    
                    if(!comment) {
                        res.status(HTTP_ERRORS.NOT_FOUND).send({ error: "Not Found"})
                        
                        
                        return
                    }
                    
                    const deletedComment = await CommentsModel.query().deleteById(commentId.commentId)
                    res.status(HTTP_SUCCESS.OK).send(deletedComment)
                }
            ]
        })
        
        export default handle