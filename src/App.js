import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserList from "./containers/Users";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manage/user" element={<UserList />}></Route>
      </Routes>
    </>
  );
}

export default App;
