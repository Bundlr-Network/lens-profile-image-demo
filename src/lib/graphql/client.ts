import { ApolloClient, InMemoryCache } from '@apollo/client';

if (!process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT) {
  throw new Error('NEXT_PUBLIC_GRAPHQL_ENDPOINT is not defined');
}

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

export default client;