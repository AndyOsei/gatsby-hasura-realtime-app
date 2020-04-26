/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
const fetch = require("isomorphic-fetch")

module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "hasura",
        fieldName: "blog",
        url: "https://hasura-gatsby-backend.herokuapp.com/v1/graphql",
        fetch,
      },
    },
  ],
}
