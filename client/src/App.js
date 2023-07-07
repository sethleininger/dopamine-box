import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// import pages
import Welcome from "./pages/Welcome";
// import CalendarPage from "./pages/Calendar";
import Profile from "./pages/Profile";
import CreateGoal from "./pages/CreateGoal";
//import components
// import LoginForm from "./components/LoginForm";
// import SignupForm from "./components/SignupForm";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [currentPage, setCurrentPage] = useState("Welcome");

  const renderPage = () => {
    if (currentPage === "Welcome") {
      return <Welcome />;
    }
    if (currentPage === "Profile") {
      return <Profile />;
    }
    if (currentPage === "CreateGoal") {
      return <CreateGoal />;
    }
    // if (currentPage === "CalendarPage") {
    //   return <CalendarPage />;
    // }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <ApolloProvider client={client}>
      <div>
        <Header currentPage={currentPage} handlePageChange={handlePageChange} />
      </div>
      <div>{renderPage()}</div>
      <div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
