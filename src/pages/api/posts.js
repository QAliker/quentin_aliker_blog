import mw from "@/api/mw"
import { validate } from "@/api/middlewares/validate"
import { contentValidators, titleValidators, pageValidators } from "@/utils/validators"
import config from "@/web/config"
import auth from "@/api/middlewares/auth"
import { HTTP_SUCCESS, HTTP_ERRORS } from "@/api/constants"
const handle = mw({
  POST: [
    auth,
    validate({
      body: {
        title: titleValidators,
        content: contentValidators,
      },
    }),
    async ({
      models: { PostsModel },
      req: {
        body: { title, content },
      },
      res,
      session,
    }) => {
      const posts = await PostsModel.query()
      .insert({ userId: session.id ,title, content, views: 0, createdAt: "NOW()", updatedAt: "NOW()"  })
      res.status(HTTP_SUCCESS.CREATED).send("the posts has been inserted in the database", posts)
    },
  ],
  GET: [ validate({
    query:{
      page: pageValidators.optional(),
    },
  }),
  async ({
    res,
    models: { PostsModel },
    input: {
      query: { page },
    },
  }) => {
    const query = PostsModel.query()
    const posts = await query
    .clone()
    .withGraphFetched("user")
    .limit(config.ui.itemsPerPage)
    .offset((page - 1) * config.ui.itemsPerPage)
    const [{ count }] = await query.clone().count()

    if(!posts) {
      res.status(HTTP_ERRORS.NOT_FOUND).send({ error: "Not Found"})
    }

    res.status(HTTP_SUCCESS.OK).send ({
      result: posts,
      meta: {
        count, 
      },
    })
  }],
})

export default handle