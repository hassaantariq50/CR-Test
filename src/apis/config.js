// import axios from "axios";
// import { useMutation, useQuery } from "react-query";
// import { errorHandler } from "helpers/errorHandler";
// import { Queries } from "./queries";
// import { Mutations } from "./mutations";

// const userModule = axios.create({
//   baseURL: process.env.REACT_APP_BACKEND_URL + "/api/user",
//   // baseURL: `http://192.168.88.10:5000/api/user`,
// });

// export { useMutation, useQuery, errorHandler, userModule, Queries, Mutations };

import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import Cookies from "js-cookie";
import { userCookie } from "../redux/constants";

const authLink = setContext((_, { headers }) => {
  //----------------------------------------//
  //    Getting User token from Cookies     //
  //----------------------------------------//
  const token = Cookies.get(userCookie.TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
});

const defaultOptions = {
  watchQuery: {
    fetchpolicy: "cache-and-network",
  },
  query: {
    fetchpolicy: "cache-and-network",
  },
};

const userHttpLink = createHttpLink({
  uri: process.env.REACT_APP_BASE_URL_API,
});

const userClient = new ApolloClient({
  link: authLink.concat(userHttpLink),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

export { userClient };
