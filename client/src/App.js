import React, { useState } from "react";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// import pages
import Welcome from "./pages/Welcome/Welcome";
import CalendarPage from "./pages/Calendar";
import Profile from "./pages/Profile/Profile";
import SaveGoalForm from "./pages/CreateGoal";
import AuthForm from "./components/AuthForm";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
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
      return <SaveGoalForm />;
    }
    if (currentPage === "CalendarPage") {
      return <CalendarPage />;
    }
    // if (currentPage === "Login") {
    //   return <LoginForm />;
    // }
    if (currentPage === "AuthForm") {
      return <AuthForm />;
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <ApolloProvider client={client}>
      {/* <Navbar/> */}
      <div>
        <Header currentPage={currentPage} handlePageChange={handlePageChange} />
      </div>
      <div className="renderPage">{renderPage()}</div>
      <div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;