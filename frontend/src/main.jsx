import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { AuthProvider } from "./features/auth/authProvider";
import App from "./app";

// 🔗 Apollo HTTP Link
const httpLink = new HttpLink({
  uri: "http://192.168.178.10:8000/graphql/query/",
});

// 🔗 Apollo WS Link
const wsLink = new GraphQLWsLink(
  createClient({
    url: "wss://192.168.178.10:5012/graphql",
  })
);

// 📡 Split für Subscriptions vs Queries/Mutations
const splitLink = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return def.kind === "OperationDefinition" && def.operation === "subscription";
  },
  wsLink,
  httpLink
);

// 🚀 Apollo Client
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </ApolloProvider>
  </StrictMode>
);

