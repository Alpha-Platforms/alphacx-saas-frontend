import React from "react";
import "./dashboard.scss";
import "./dashcards/pieChartCard/pieChartCard.scss";
import "react-circular-progressbar/dist/styles.css";

import Navigation from "./navigation";
import AgentDashboard from "./agentDashboard";

const Dashboard = () => {
  return (
    <>
      <Navigation />
      <AgentDashboard />
    </>
  );
};

export default Dashboard;
