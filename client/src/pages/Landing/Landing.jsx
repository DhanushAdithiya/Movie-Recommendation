import React from "react";
import "../Landing/landing.css";

console.log(process.env.REACT_APP_API_KEY);

const Landing = () => {
  return (
    <div className="landing">
      <div className="landing-container">
        <h1 className="landing-main">
          DISCOVER YOUR NEW FAVORAITE <br /> FILM TODAY
        </h1>
        <a href="/search" className="landing-secondary">
          TRY IT NOW
        </a>
      </div>
    </div>
  );
};

export default Landing;
