import mw from "@/api/mw"

const handle = mw({
  POST: [
    async ({
      db,
      req: {
        body: { title, content}
      },
      res
    }) => {
      const posts = await db("posts")
      .insert({ title, content, created_at: "NOW()", updated_at: "NOW()"  })
      res.send("the posts has been inserted in the database")
    },
  ],
  GET: [async ({ res, db }) => res.send(await db("posts"))],
})

export default handle
