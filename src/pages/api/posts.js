import mw from "@/api/mw"

const handle = mw({
  POST: [
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
