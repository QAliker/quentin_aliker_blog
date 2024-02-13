import mw from "@/api/mw"
import { validate } from "@/api/middlewares/validate"
import authAdmin from "@/api/middlewares/authAdmin"
import { pageValidators } from "@/utils/validators"
import { HTTP_ERRORS, HTTP_SUCCESS } from "@/api/constants"
const handle = mw({
    GET: [
        authAdmin,
        validate({
            query:{
                page: pageValidators.optional()
            }}),
            async ({
                res,
                req: {
                    query: { username },
                },
                models: { UserModel },
            }) => {
                const user = await UserModel.query().select("email", "username").where("username", username)
                
                if (!user) {
                    res.status(HTTP_ERRORS.NOT_FOUND).send({ result: false })
                    
                    return
                }
                
                res.status(HTTP_SUCCESS.OK).send({ result: user })
            },
        ],
        DELETE: [
            authAdmin,
            async ({
                models: { UserModel, PostsModel, CommentsModel },
                req: {
                    query: {username},
                },
                res,
            }) => {
                const id = username
                const user = await UserModel.query().findById(id).throwIfNotFound()
                
                if(!user) {
                    res.status(HTTP_ERRORS.NOT_FOUND).send({ error: "Not Found"})
                    
                    return
                }
                
                const posts = await PostsModel.query().findById(id)
                
                if(posts) {
                    await PostsModel.query().delete().where("userId", id)
                }
                
                const comments = await CommentsModel.query().findById(id)

                if(comments) {
                    await CommentsModel.query().delete().where("userId", id)
                }

                await UserModel.query().deleteById(id)
                
                res.status(HTTP_SUCCESS.OK).send("user posts and comments were deleted")
            }
        ],
        PATCH: [
            authAdmin,
            async ({
                models: { UserModel },
                req: {
                    query: { username } ,
                    body,
                },
                res,
            }) => {
                const user = await UserModel.query().where("username",username)
                
                if(!user) {
                    res.status(HTTP_ERRORS.NOT_FOUND).send({ error: "Not Found"})
                    
                    return 
                }
                
                const updatedUser = await UserModel.query().patchAndFetchById(
                    user[0].id,
                    {
                        username: body.username,
                        email: body.email,
                    }
                    )
                    res.status(HTTP_SUCCESS.OK).send(updatedUser)
                },
            ],
        })
        
        export default handle