import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { split, ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
//import { AsyncStorage } from "react-native";
import { tokenName } from "./utils/static_constants";

// developpement
const graphqlUrl = `http://localhost:3001/graphql`;
// const wsUrl = "ws://10.0.3.2:3000/subscriptions";
const wsUrl = "ws://localhost:3001/graphql";

//production digital ocean
// const graphqlUrl = "http://46.101.207.204/graphql";
// const wsUrl = "http://46.101.207.204/subscriptions";

export const wsLink = new WebSocketLink({
  uri: wsUrl,
  options: {
    reconnect: true,
    lazy: true,
    connectionParams: async () => ({
      token: await localStorage.getItem(tokenName)
    })
  }
});

const httpLink = createHttpLink({
  uri: graphqlUrl
});

// adding auth headers
const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await localStorage.getItem(tokenName);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const finaleLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  authLink.concat(httpLink)
);

// Creating a client instance
export default new ApolloClient({
  link: ApolloLink.from([finaleLink]),

  cache: new InMemoryCache()
});
