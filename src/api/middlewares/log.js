// eslint-disable-next-line no-unused-vars
const log = async ({req, res, next}) => {
    await next()
}

export default log