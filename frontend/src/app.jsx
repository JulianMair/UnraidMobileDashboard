import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import System from './components/system';
import Container from './components/container';
import Vm from './components/vm';
import Shares from './components/shares';


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
  uri: 'http://127.0.0.1:8000/graphql/query'

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
          {/* Header */}
          <header className="text-xl text-amber-50 bg-gray-500 font-bold pb-4 text-center pt-3.5">
            Unraid Mobile Dashboard
          </header>

          {/* Hauptinhalt */}
          <main className="flex-grow pb-16 bg-gray-800 text-amber-50">
            <Routes>
              <Route path="/" element={<System />} />
              <Route path="/system" element={<System />} />
              <Route path="/container" element={<Container />} />
              <Route path="/vm" element={<Vm />} />
              <Route path="/shares" element={<Shares />} />
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
