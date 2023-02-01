import React from "react";
import "./App.css";
import { Box, ChakraProvider } from "@chakra-ui/react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
} from "@apollo/client";
import { GET_USERs } from "./queries";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

interface UsersResponse {
  id: string;
  name: string;
  email: string;
}

function Users() {
  const { loading, data } = useQuery<{users: UsersResponse[]}>(GET_USERs);

  return <>
  {data?.users.map(user => <Box padding={5} key={user.id}>{user.name}</Box>)}
  </>
}

function AppBody() {
  return (
    <div className="App">
      <Users/>
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <AppBody />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
