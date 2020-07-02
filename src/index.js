import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http"; //I cannot figure out how this import works (because I did not install it)
import { InMemoryCache } from "apollo-cache-inmemory"; //I cannot figure out how this import works (because I did not install it)
//import { ApolloClient, gql } from "apollo-boost";
import { ApolloClient } from "apollo-boost";

import { store, persistor } from "./redux/store";

import "./index.css";
import App from "./App";

import { resolvers, typeDefs } from "./graphql/resolvers";

//configs for Apollo - start
const httpLink = createHttpLink({
  uri: "https://crwn-clothing.com",
});

const cache = new InMemoryCache();

// const client = new ApolloClient({
//   link: httpLink,
//   cache,
// });
const client = new ApolloClient({
  link: httpLink,
  cache,
  typeDefs,
  resolvers,
});
//configs for Apollo - end

client.writeData({
  data: {
    cartHidden: true,
    cartItems: [],
    itemCount: 0
  },
});

//the code below fetches data from https://crwn-clothing.com and log consoles
//just for an example!
/*
client.query({
  query: gql`
  {
    getCollectionsByTitle(title:"hats") {
      id
      title
      items {
        id
        name
        price
      }
    }
  }
  `
}).then(res => console.log(res));
*/

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
