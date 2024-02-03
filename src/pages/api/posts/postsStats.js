import mw from "../../../api/mw"
import { HTTP_ERRORS } from "../../../api/constants"
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
                res,
                session,
                models: { PostsModel },
            }) => {
                const count = await PostsModel.query()
                .count("* as totalPosts").where("user_id", "=", session.id)
                res.send({result: count})
            },
        ],
    })
    
    export default handle