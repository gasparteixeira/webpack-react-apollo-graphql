import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { InMemoryCache } from "apollo-cache-inmemory";

import "./style.css";
import App from "./App";

const httpLink = new HttpLink({
  uri: process.env.GITHUB_BASE_API,
  headers: {
    authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`
  }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    // do something with graphql error
    console.log(graphQLErrors);
  }

  if (networkError) {
    // do something with network error
    console.log(networkError);
  }
});

const link = ApolloLink.from([errorLink, httpLink]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,

  document.getElementById("app")
);

module.hot && module.hot.accept();
