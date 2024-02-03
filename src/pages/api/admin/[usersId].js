import mw from "@/api/mw"
import { validate } from "@/api/middlewares/validate"
import authAdmin from "@/api/middlewares/authAdmin"
import { pageValidators } from "@/utils/validators"
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
                query: userId ,
            },
            models: { UserModel },
        }) => {
            const id = userId.usersId
            const user = await UserModel.query()
            .findOne({ id })

            if (!user) {
                res.send({ result: false })

                
return
            }

            res.send({ result: user })
        },
    ],
    DELETE: [
    authAdmin,
    async ({
        models: { UserModel, PostsModel },
        req: {
            query: userId ,
        },
        res,
    }) => {
        const user = await UserModel.query().findById(userId.usersId).throwIfNotFound()

        if(!user) {
            res.status(HTTP_ERRORS.NOT_FOUND).send({ error: "Not Found"})
            
            return
        }

        const posts = await PostsModel.query().findById(userId.usersId)

        if(posts) {
            const deletedPosts = await PostsModel.query().delete().where("user_id", userId.usersId)
        }
        
        const deletedUser = await UserModel.query().deleteById(userId.usersId)
        res.send("user and his posts were deleted")
    }
],
PATCH: [
    authAdmin,
    async ({
        models: { UserModel },
        req: {
            query: userId ,
            body,
        },
        res,
    }) => {
        const id = userId.usersId
        const user = await UserModel.query().findById(id)
        
        if(!user) {
            res.status(HTTP_ERRORS.NOT_FOUND).send({ error: "Not Found"})
            
            return 
        }

        const updatedUser = await UserModel.query().patchAndFetchById(
            id,
            {
                username: body.username,
                email: body.email,
            }
            )
            res.send(updatedUser)
        },
    ],
})

export default handle