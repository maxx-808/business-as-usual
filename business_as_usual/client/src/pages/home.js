import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import userContext from "../context/userContext";
import Navigation from "../components/nav/nav";

const Home = () => {
  return (
    <div>
      <Navigation />
      <h1>Hello home</h1>
    </div>
  );
};

export default Home;
