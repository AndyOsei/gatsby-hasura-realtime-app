import React from "react"
import { graphql, Link } from "gatsby"

export const query = graphql`
  {
    blog {
      posts {
        id
        title
        author {
          first_name
          last_name
        }
      }
    }
  }
`

export default ({ data }) => (
  <div style={{ margin: "5rem auto", width: "550px" }}>
    {data.blog.posts.map(post => (
      <article key={post.id}>
        <h2>
          <Link to={`/post/${post.id}`}>{post.title}</Link>
        </h2>
        <p>
          Written by {post.author.first_name} {post.author.last_name}
        </p>
      </article>
    ))}
  </div>
)
