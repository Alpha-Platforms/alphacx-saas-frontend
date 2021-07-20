import React from "react";
import "./lineChartCard.scss";
import { Line } from "react-chartjs-2";

const LineChartCard = () => {
  const data = {
    labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Email",
        data: [12, 22, 25, 5, 2, 3, 13],
        fill: false,
        backgroundColor: "#133759",
        borderColor: "#133759",
        borderWidth: 1,
      },
      {
        label: "LiveChat",
        data: [5, 9, 3, 15, 2, 30, 35],
        fill: false,
        backgroundColor: "#662D91",
        borderColor: "#662D91",
        borderWidth: 1,
      },
      {
        label: "Calls",
        data: [2, 7, 31, 12, 15, 10, 15],
        fill: false,
        backgroundColor: "#ECBA41",
        borderColor: "#ECBA41",
        borderWidth: 1,
      },
      {
        label: "Whatsapp",
        data: [3, 19, 13, 6, 18, 9, 20],
        fill: false,
        backgroundColor: "#51B74F",
        borderColor: "#51B74F",
        borderWidth: 1,
      },
      {
        label: "Facebook",
        data: [5, 9, 3, 19, 17, 15, 10],
        fill: false,
        backgroundColor: "#4DCACA",
        borderColor: "#4DCACA",
        borderWidth: 1,
      },
      {
        label: "Service Portal",
        data: [5, 9, 3, 21, 21, 20, 40],
        fill: false,
        backgroundColor: "#C16473",
        borderColor: "#C16473",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <div className="line-chart">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChartCard;
