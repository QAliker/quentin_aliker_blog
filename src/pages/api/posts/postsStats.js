import mw from "../../../api/mw"
import { pageValidators } from "@/utils/validators"
import { validate } from "@/api/middlewares/validate"
import auth from "@/api/middlewares/auth"
import { HTTP_SUCCESS } from "@/api/constants"
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
                .count("* as totalPosts").where("userId", "=", session.id)
                res.status(HTTP_SUCCESS.OK).send({result: count})
            },
        ],
    })
    
    export default handle