import mw from "../../../api/mw"
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
                    query: { titleComments } ,
                },
                models: { CommentsModel, PostsModel },
            }) => {
                const posts = await PostsModel.query().select("id").where("title", titleComments)
                const comments = await CommentsModel.query()
                .where("postId", posts[0].id).withGraphFetched("user")
                res.send({ result: comments })
            },
        ],
        POST: [
            auth,
            async ({
                models: { CommentsModel, PostsModel },
                req: {
                    body: { content },
                    query: { titleComments }
                },
                res,
                session,
            }) => {
                const postsId = await PostsModel.query().select("id").where("title", titleComments)
                const comment = await CommentsModel.query()
                .insert({ userId: session.id , postId: postsId[0].id, content , createdAt: "NOW()"  })
                res.send("the comment has been inserted in the database", comment)
            },
        ],
    })
    
    export default handle