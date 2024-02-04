import mw from "@/api/mw"
import authAdmin from "@/api/middlewares/authAdmin"
import { HTTP_ERRORS } from "../../../api/constants"

const handle = mw({
PATCH: [
    authAdmin,
    async ({
        models: { UserModel },
        req: {
            query: userId,
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
                role: 404,
            }
            )
            res.send("user has been diasable", updatedUser)
        },
    ],
})

export default handle