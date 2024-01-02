import { validate } from "@/api/middlewares/validate";
import mw from "@/api/mw";
import { emailValidators, passwordValidators, usernameValidators } from "@/utils/validators";

const handle = mw({
    POST: [
        validate({
            body: {
                email: emailValidators,
                username: usernameValidators,
                password: passwordValidators,
            },
        }),
        async ({
            input: {
                body: { email, password, username, role },
            },
            models: { UserModel },
            res,
        }) => {
            const user = await UserModel.query().findOne({ email })
            
            if (user) {
                res.send({ result: true })
                
                return
            }
            
            const [passwordHash, passwordSalt] =
            await UserModel.hashPassword(password)
            
            await UserModel.query().insertAndFetch({
                email,
                username,
                passwordHash,
                passwordSalt,
                role: 0
            })
            
            res.send({ result: true })
        },
    ],
})

export default handle