import React from "react";
import "./home.css";
import Rows from "./Rows";

const Home = () => {
  return (
    <div>
      <div className="home-header">
        <div>
          <h1>Book My Ticket</h1>
        </div>
        <div className="home">Home</div>
      </div>

      <Rows />
    </div>
  );
};

export default Home;
