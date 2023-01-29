import React from "react";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <div className="home-header">
      <div>
        <h1>Book My Ticket</h1>
      </div>
      <Link to="/" className="home">
        Home
      </Link>
    </div>
  );
};

export default NavigationBar;
