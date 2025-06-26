import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import App from "./App";

const client = new ApolloClient({
  link: createUploadLink({
    uri: "http://localhost:8000/graphql/",
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }),
  cache: new InMemoryCache(),
});


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
