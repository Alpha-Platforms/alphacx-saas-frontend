import React from "react";
import { Pie } from "react-chartjs-2";
import "./pieChartCard.scss";
import {
  // main component
  Chart,
  // graphs
  Bars,
  Cloud,
  Dots,
  Labels,
  Lines,
  Pies,
  RadialLines,
  Ticks,
  Title,
  // wrappers
  Layer,
  Animate,
  Transform,
  Handlers,
  // helpers
  helpers,
  DropShadow,
  Gradient,
} from "rumble-charts";

const PieChartCard = () => {
  const data = {
    // labels: ["Open", "Pending", "Closed", "In Progress"],
    datasets: [
      {
        // label: "# of Votes",
        data: [25, 5, 20, 18],
        backgroundColor: ["#133759", "#ECBA41", "#51B74F", "#FD7289"],
        borderColor: ["#133759", "#ECBA41", "#51B74F", "#FD7289"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    cutoutPercentage: 50,
    legend: {
      display: true,
      position: "bottom",
      labels: {
        fontSize: 250,
      },
    },
  };
  const series = [
    {
      data: [1, 2, 4, 8, 3],
      backgroundColor: ["#133759", "#ECBA41", "#51B74F", "#FD7289"],
    },
  ];

  return (
    <div className="pie-chart">
      <div className="top-bar">
        <p>Ticket Status</p>
      </div>
      {/* <Chart width={170} height={170} series={series}>
        <Transform method={["transpose", "stack"]}>
          <Pies combined={true} />
        </Transform>
      </Chart> */}

      <Pie
        data={data}
        width={175}
        height={175}
        options={{
          maintainAspectRatio: false,
          legend: { display: true, position: "right" },

          datalabels: {
            display: true,
            color: "white",
          },
          tooltips: {
            backgroundColor: "#5a6e7f",
          },
        }}
      />
      <div className="details">
        <div className="detail">
          <div className="dot"></div>
          <p>Open</p>
        </div>
        <div className="detail">
          <div className="dot"></div>
          <p>In Progress</p>
        </div>
        <div className="detail">
          <div className="dot"></div>
          <p>Pending</p>
        </div>
        <div className="detail">
          <div className="dot"></div>
          <p>Closed</p>
        </div>
      </div>
      {/* <div className="details">
        <div className="detail">
          <span className="dot"></span>
          <p>Open</p>
        </div>
      </div> */}
    </div>
  );
};

export default PieChartCard;
