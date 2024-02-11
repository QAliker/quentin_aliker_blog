import { HTTP_ERRORS } from "@/api/constants"
import mw from "@/api/mw"
import auth from "@/api/middlewares/auth"
const handle = mw({
        PATCH: [
            auth,
            async ({
                models: { PostsModel },
                req: {
                    query: { titlePost },
                },
                res,
            }) => {
                const post = await PostsModel.query().select("views", "id").where("title", titlePost)
                
                if(!post) {
                    res.status(HTTP_ERRORS.NOT_FOUND).send({ error: "Not Found"})
                    
                    return 
                }
                
                const [ { views } ] = post
                const updatedViews = await PostsModel.query().patchAndFetchById(
                    post[0].id,
                    {
                        views: views + 1,
                    }
                    )
                    res.send(updatedViews)
                },
            ],
        })
        export default handle