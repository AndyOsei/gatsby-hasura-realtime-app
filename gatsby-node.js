exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const { data } = await graphql(`
    {
      blog {
        posts {
          id
          title
        }
      }
    }
  `)

  // TODO: handle errors :(

  const posts = data.blog.posts

  posts.forEach(post => {
    createPage({
      path: `/post/${post.id}`,
      component: require.resolve("./src/templates/post.js"),
      context: {
        id: post.id,
      },
    })
  })
}
