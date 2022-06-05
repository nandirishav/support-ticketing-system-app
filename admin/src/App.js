import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";
import UserList from "./pages/UserList";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Dashboard />} />
            </Route>
            <Route path="/users" element={<PrivateRoute />}>
              <Route path="/users" element={<UserList />} />
            </Route>
            {/* <Route path="/users">
            <UserList />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newUser">
            <NewUser />
          </Route> */}
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
