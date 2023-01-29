import React from "react";
import "./home.css";
import InitialSeatingArrangementSetup from "./InitialSeatingArrangementSetup";
import Movies from "./Movies";

const Home = () => {
  return (
    <div>
      <div className="home-header">
        <div>
          <h1>Book My Ticket</h1>
        </div>
        <div className="home">Home</div>
      </div>

      <Movies />
    </div>
  );
};

export default Home;
