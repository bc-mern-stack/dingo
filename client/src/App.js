import "./App.css";
import Home from "./components/Home";
import User from "./components/User";
import DogWalker from "./pages/DogWalker";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Footer from "./components/Footer";
import { Route } from "react-router-dom";

// add apollo client to the App
import { setContext } from "@apollo/client/link/context";

import {
  ApolloProvider, // provides data to componenents
  ApolloClient, // constructor, initializes connection to server
  InMemoryCache, // caches API responses for efficiency
  createHttpLink, // controls how client makes requests
} from "@apollo/client";

const httpLink = createHttpLink({
  uri: "/graphql", // links to GraphQL server
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  // set the http headers of every request to include the token!!
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // tie the auth and http links together!!
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route exact path="/user" component={User} />
        <Route exact path="/dogwalker/:username?" component={DogWalker} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
