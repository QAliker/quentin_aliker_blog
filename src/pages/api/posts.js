import mw from "@/api/mw"
import { validate } from "@/api/middlewares/validate"
import { contentValidators, titleValidators  } from "@/utils/validators"

const handle = mw({
  POST: [
    validate({
      body: {
        title: titleValidators,
        content: contentValidators
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
  GET: [async ({ res, models:{PostsModel} }) => {
    const posts = await PostsModel.query()
    res.send(posts)
  }],
})

export default handle
