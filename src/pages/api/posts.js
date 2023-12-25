import mw from "@/api/mw"
import { validate } from "@/api/middlewares/validate"
import { contentValidators, titleValidators, pageValidator } from "@/utils/validators"
import config from "@/web/config"
const handle = mw({
  POST: [
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
    }) => {
      const posts = await PostsModel.query()
      .insert({ title, content, created_at: "NOW()", updated_at: "NOW()"  })
      res.send("the posts has been inserted in the database", posts)
    },
  ],
  GET: [ validate({
    query:{
      page: pageValidator.optional(),
    },
  }),
async ({
  res,
  models: { PostsModel},
  input: {
    query: { page },
  },
}) => {
  const query = PostsModel.query()
  const posts = await query
  .clone()
  .limit(config.ui.itemsPerPage)
  .offset((page - 1) * config.ui.itemsPerPage)
  const [{ count }] = await query.clone().count()
    setTimeout( () => res.send ({
      result: posts,
      meta: {
        count, 
      },
    }),
    3000
    )
}],
})

export default handle
