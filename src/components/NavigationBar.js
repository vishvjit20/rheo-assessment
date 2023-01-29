import React from "react";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <div className="home-header">
      <div className="home-header-text">Book My Ticket</div>
      <Link to="/" className="home">
        Home
      </Link>
    </div>
  );
};

export default NavigationBar;
