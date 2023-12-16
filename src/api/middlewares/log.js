const log = async (req, res, next) => {
    
    await next()
}

export default log