import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center my-4">
      <Link to={"/manage/user"}>User List</Link>
    </div>
  );
};

export default Home;
