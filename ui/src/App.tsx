import React, { useState } from "react";
import "./App.css";
import { Box, ChakraProvider, Link } from "@chakra-ui/react";
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
  let [page, setPage] = useState(1);
  const limit = 10;
  

  function back() {
    return(
      start > 0 ? setPage(page - 1): null
    )
  }
  function forward() {
    return(
      lent? end < lent ? setPage(page + 1) : null : null
    )
  }
  const start = (page-1) * limit;
  const end = start + limit;
  const lent = data?.users.length
  const totalPages = lent? Math.ceil(lent/limit) : 1

  const newdata = data?.users.slice(start, end);
  return <>
  {newdata?.map(user => <Box padding={5} key={user.id}>{user.name}</Box>)}
  <div>
  <button onClick={back}>Prev</button>
  <div className='text-xs'>
        {page} / {totalPages}
 </div>
  <button onClick={forward}>Next</button>
  </div>
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
