import React from "react";
import "./welcomeCard.scss";

const WelcomeCard = () => {
  return (
    <div className="welcome-card">
      <h3 className="sub-title"> Hi, Dabo</h3>
      <p className="message">
        Here’s your activity today, take out time to look at this.
      </p>
    </div>
  );
};

export default WelcomeCard;
