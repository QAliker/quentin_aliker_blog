import { UnauthorizedError } from "@/api/errrors";
import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw";
import { emailValidators, passwordValidators, usernameValidators } from "@/utils/validators";

const handle = mw({
    POST: [
        validate({
            body: {
                email: emailValidators,
                password: passwordValidators,
                username: usernameValidators
            },
        }),
        async ({
            input: {
                body: { username, password },
            },
            models: { UserModel },
            res,
        }) => {
            const user = await UserModel.query().findOne({ username })
            
            if (!user) {
                throw new UnauthorizedError()
            }
            
            const [passwordHash] = await UserModel.hashPassword(
                password,
                user.passwordSalt,
                )
                
                if (passwordHash !== user.passwordHash) {
                    throw new UnauthorizedError()
                }
                
                res.send({ result: "SUCCESS" })
            },
        ],
    })
    
    export default handle