import React, { useState } from "react";
import "./App.css";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import {  Nav, Modal, Tab, Button } from 'react-bootstrap';
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
import Profile from "./pages/Profile";
import SaveGoalForm from "./pages/CreateGoal";
// import Navbar from './components/Navbar';
//import components
import LoginForm from "./components/LoginForm";
// import SignUpForm from "./components/SignupForm";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import SignupForm from "./components/SignupForm";
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

  // const [showModal, setShowModal] = useState(false);

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
    if (currentPage === "Login") {
      return <LoginForm />;
    }
    if (currentPage === "Signup") {
      return <SignupForm />;
    }    
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <ApolloProvider client={client}>
      {/* <Navbar/> */}
      <div>
        < Header currentPage={currentPage} handlePageChange={handlePageChange}/>
      </div>
      <div>{renderPage()}</div>
      <div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
