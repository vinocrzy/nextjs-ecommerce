import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

// Apollo GraphQL client.
const client = new ApolloClient({
  link: createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
    fetch: fetch,
  }),
  cache: new InMemoryCache(),
});

export default client;
