import React from "react"
import ApolloClient from "apollo-client"
import fetch from "isomorphic-fetch"
import { split } from "apollo-link"
import { ApolloProvider } from "react-apollo-hooks"
import { HttpLink } from "apollo-link-http"
import { WebSocketLink } from "apollo-link-ws"
import { getMainDefinition } from "apollo-utilities"
import { SubscriptionClient } from "subscriptions-transport-ws"
import { InMemoryCache } from "apollo-cache-inmemory"
import ws from "ws"

const http = new HttpLink({
  uri: "https://hasura-gatsby-backend.herokuapp.com/v1/graphql",
  fetch,
})

const wsForNode = typeof window === "undefined" ? ws : null

const wsClient = new SubscriptionClient(
  "ws://hasura-gatsby-backend.herokuapp.com/v1/graphql",
  {
    reconnect: true,
  },
  wsForNode
)

const websocket = new WebSocketLink(wsClient)

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)

    return kind === "OperationDefinition" && operation === "subscription"
  },
  websocket,
  http
)

export const client = new ApolloClient({ link, cache: new InMemoryCache() })

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
)
