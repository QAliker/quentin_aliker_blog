import mw from "@/api/mw";
import { validate } from "@/api/middlewares/validate";
import authAdmin from "@/api/middlewares/authAdmin";
const handle = mw({
    GET: [
        authAdmin,
        async ({
            res,
            session,
            models: { UserModel },
        }) => {
            const user = await UserModel.query()
            if (!user) {
                res.send({ result: false })
                return
            }
            res.send({ result: user })
        }
    ],
})

export default handle