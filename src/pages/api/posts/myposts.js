import mw from "@/api/mw"
import { validate } from "@/api/middlewares/validate"
import { pageValidators } from "@/utils/validators"
import config from "@/web/config"
import auth from "@/api/middlewares/auth"
import { HTTP_SUCCESS } from "@/api/constants"
const handle = mw({
    GET: [ 
        auth,
        validate({
            query:{
                page: pageValidators.optional(),
            },
        }),
        async ({
            res,
            session,
            models: { PostsModel },
            input: {
                query: { page },
            },
        }) => {
            const query = PostsModel.query()
            const posts = await query
            .clone().where("userId", "=", session.id)
            .withGraphFetched("user")
            .limit(config.ui.itemsPerPage)
            .offset((page - 1) * config.ui.itemsPerPage)
            const [{ count }] = await query.clone().count()
            res.status(HTTP_SUCCESS.OK).send ({result: posts, meta: { count },})
        }],
    })
    
    export default handle