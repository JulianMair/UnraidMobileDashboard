import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './layout/navbar';
import System from './features/system/systemPage';
import Container from './features/containers/containerPage';
import Vm from './features/vms/vm';
import Shares from './features/shares/shares';
import Header from './layout/header';
import PrivateRoute from "./features/auth/privateroute";
import Login from "./features/auth/login";


import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';


// 🔗 HTTP Link für Queries & Mutations
const httpLink = new HttpLink({
  uri: 'http://192.168.178.10:8000/graphql/query/'

});

// 🔗 WebSocket Link für Subscriptions
const wsLink = new GraphQLWsLink(
  createClient({
    url: 'wss://192.168.178.10:5012/graphql'
  })
);


// 📡 Routing: splitet basierend auf Operationstyp
const splitLink = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return def.kind === 'OperationDefinition' && def.operation === 'subscription';
  },
  wsLink,
  httpLink
);

// 🚀 Apollo Client
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />

          {/* Hauptinhalt */}
          <main className="flex-grow pb-16 bg-gray-800 text-amber-50">

            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/system"
                element={
                  <PrivateRoute>
                    <System />
                  </PrivateRoute>
                }
              />
              <Route
                path="/container"
                element={
                  <PrivateRoute>
                    <Container />
                  </PrivateRoute>
                }
              />
              <Route
                path="/vm"
                element={
                  <PrivateRoute>
                    <Vm />
                  </PrivateRoute>
                }
              />
              <Route
                path="/shares"
                element={
                  <PrivateRoute>
                    <Shares />
                  </PrivateRoute>
                }
              />
            </Routes>

          </main>

          {/* Navbar */}
          <Navbar />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
