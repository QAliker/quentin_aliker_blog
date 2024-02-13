import mw from "@/api/mw"
import authAdmin from "@/api/middlewares/authAdmin"
import { HTTP_ERRORS, HTTP_SUCCESS } from "@/api/constants"
const handle = mw({
    GET: [
        authAdmin,
        async ({
            res,
            models: { UserModel },
        }) => {
            const user = await UserModel.query()
            
            if (!user) {
                res.status(HTTP_ERRORS.NOT_FOUND).send({ error: "Not Found" })
                
                
                return
            }
            
            res.status(HTTP_SUCCESS.OK).send({ result: user })
        }
    ],
})

export default handle