import React from "react";
import "./home.css";
import Movies from "./Movies";
import NavigationBar from "./NavigationBar";

const Home = () => {
  return (
    <div>
      <NavigationBar />
      <Movies />
    </div>
  );
};

export default Home;
