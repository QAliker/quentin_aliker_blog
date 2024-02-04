import { HTTP_ERRORS } from "@/api/constants"
import mw from "@/api/mw"
import auth from "@/api/middlewares/auth"
const handle = mw({
        PATCH: [
            auth,
            async ({
                models: { PostsModel },
                req: {
                    query: { postsId },
                },
                res,
            }) => {
                const posts = await PostsModel.query().findById(postsId)
                const {views} = posts

                if(!posts) {
                    res.status(HTTP_ERRORS.NOT_FOUND).send({ error: "Not Found"})
                    
                    return 
                }

                const updatedViews = await PostsModel.query().patchAndFetchById(
                    postsId,
                    {
                        views: views + 1,
                    }
                    )
                    res.send(updatedViews)
                },
            ],
        })
        export default handle