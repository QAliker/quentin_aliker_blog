import mw from "@/api/mw"
import { validate } from "@/api/middlewares/validate"
import { emailValidators, pageValidators, passwordValidators, usernameValidators } from "@/utils/validators"
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
                models: { UserModel },
            }) => {
                const {id} = session
                const user = await UserModel.query()
                .findOne({ id })
                
                if (!user) {
                    res.send({ result: false })
                    
                    return
                }
                
                res.send({ result: user })
            },
        ],
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
        PATCH: [
            auth,
            async ({
                models: { UserModel },
                req: {
                    body,
                },
                res,
                session
            }) => {
                const {id} = session
                const user = await UserModel.query().findById(id)
                
                if(!user) {
                    res.status(HTTP_ERRORS.NOT_FOUND).send({ error: "Not Found"})
                    
                    return 
                }
                
                const updatedUser = await UserModel.query().patchAndFetchById(
                    id,
                    {
                        username: body.username,
                        email: body.email,
                    }
                    )
                    res.send(updatedUser)
                },
            ],
        })
        
        export default handle