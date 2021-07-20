import React from "react";
import "./dashboard.scss";
import DonutChartCard from "./dashcards/donutChartCard";
import LineChartCard from "./dashcards/lineChartCard";
import PieChartCard from "./dashcards/pieChartCard";
import TotalCard from "./dashcards/totalCard";
import WelcomeCard from "./dashcards/welcomeCard";

import Navigation from "./navigation";

const Dashboard = () => {
  return (
    <>
      <Navigation />
      <div className="dashboard">
        <div className="charts">
          <div className="top">
            <PieChartCard />
            <PieChartCard />
            <div className="pie"></div>
          </div>
          <LineChartCard />
        </div>
        <div></div>
        {/* <WelcomeCard />
        <TotalCard title="Assigned Tickets" value={57} />
        <TotalCard title="Overdue Tickets" color="#FD7289" value={10} />
        <PieChartCard />
        <LineChartCard />
        <DonutChartCard /> */}
      </div>
    </>
  );
};

export default Dashboard;
