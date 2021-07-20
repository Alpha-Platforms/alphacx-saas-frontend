import React, { useEffect } from "react";
import "./lineChartCard.scss";
import { Line } from "react-chartjs-2";

const LineChartCard = () => {
  let datasetsArr1 = [
    {
      id: "emailLegend",
      type: "line",
      label: "Email",
      data: [12, 22, 25, 5, 2, 3, 13],
      borderColor: "#016298",
      backgroundColor: "#016298",
      borderWidth: 2,
      fill: false,
      showLine: true,
      pointRadius: 4,
      pointBorderColor: "rgba(0, 0, 0, 0)",
      pointBackgroundColor: "rgba(0, 0, 0, 0)",
      pointHoverBorderColor: "#016298",
      pointHoverBackgroundColor: "#016298",
    },
    {
      id: "livechatLegend",
      type: "line",
      label: "LiveChat",
      data: [5, 9, 3, 15, 2, 30, 35],
      borderColor: "#6C4181",
      backgroundColor: "#6C4181",
      borderWidth: 2,
      fill: false,
      showLine: true,
      pointRadius: 4,
      pointBorderColor: "rgba(0, 0, 0, 0)",
      pointBackgroundColor: "rgba(0, 0, 0, 0)",
      pointHoverBorderColor: "#6C4181",
      pointHoverBackgroundColor: "#6C4181",
    },
    {
      id: "callLegend",
      type: "line",
      label: "Calls",
      data: [2, 7, 31, 12, 15, 10, 15],
      borderColor: "#FD7289",
      backgroundColor: "#FD7289",
      borderWidth: 2,
      fill: false,
      showLine: true,
      pointRadius: 4,
      pointBorderColor: "rgba(0, 0, 0, 0)",
      pointBackgroundColor: "rgba(0, 0, 0, 0)",
      pointHoverBorderColor: "#FD7289",
      pointHoverBackgroundColor: "#FD7289",
    },
  ];

  // let datasetsArr2 = [
  //   {
  //     id: "emailLegend",
  //     type: "line",
  //     label: "Email",
  //     data: ticketTraffic.emailData,
  //     borderColor: "#016298",
  //     backgroundColor: "#016298",
  //     borderWidth: 2,
  //     fill: false,
  //     showLine: true,
  //     pointRadius: 4,
  //     pointBorderColor: "rgba(0, 0, 0, 0)",
  //     pointBackgroundColor: "rgba(0, 0, 0, 0)",
  //     pointHoverBorderColor: "#016298",
  //     pointHoverBackgroundColor: "#016298",
  //   },
  //   {
  //     id: "livechatLegend",
  //     type: "line",
  //     label: "LiveChat",
  //     data: ticketTraffic.liveChatData,
  //     borderColor: "#6C4181",
  //     backgroundColor: "#6C4181",
  //     borderWidth: 2,
  //     fill: false,
  //     showLine: true,
  //     pointRadius: 4,
  //     pointBorderColor: "rgba(0, 0, 0, 0)",
  //     pointBackgroundColor: "rgba(0, 0, 0, 0)",
  //     pointHoverBorderColor: "#6C4181",
  //     pointHoverBackgroundColor: "#6C4181",
  //   },
  //   {
  //     id: "callLegend",
  //     type: "line",
  //     label: "Calls",
  //     data: ticketTraffic.callData,
  //     borderColor: "#FD7289",
  //     backgroundColor: "#FD7289",
  //     borderWidth: 2,
  //     fill: false,
  //     showLine: true,
  //     pointRadius: 4,
  //     pointBorderColor: "rgba(0, 0, 0, 0)",
  //     pointBackgroundColor: "rgba(0, 0, 0, 0)",
  //     pointHoverBorderColor: "#FD7289",
  //     pointHoverBackgroundColor: "#FD7289",
  //   },
  // ];
  const data = {
    labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    datasets: datasetsArr1,
    // [
    //   {
    //     label: "Email",
    //     data: [12, 22, 25, 5, 2, 3, 13],
    //     fill: false,
    //     backgroundColor: "#133759",
    //     borderColor: "#133759",
    //     borderWidth: 1,
    //   },
    //   {
    //     label: "LiveChat",
    //     data: [5, 9, 3, 15, 2, 30, 35],
    //     fill: false,
    //     backgroundColor: "#662D91",
    //     borderColor: "#662D91",
    //     borderWidth: 1,
    //   },
    //   {
    //     label: "Calls",
    //     data: [2, 7, 31, 12, 15, 10, 15],
    //     fill: false,
    //     backgroundColor: "#ECBA41",
    //     borderColor: "#ECBA41",
    //     borderWidth: 1,
    //   },
    //   {
    //     label: "Whatsapp",
    //     data: [3, 19, 13, 6, 18, 9, 20],
    //     fill: false,
    //     backgroundColor: "#51B74F",
    //     borderColor: "#51B74F",
    //     borderWidth: 1,
    //   },
    //   {
    //     label: "Facebook",
    //     data: [5, 9, 3, 19, 17, 15, 10],
    //     fill: false,
    //     backgroundColor: "#4DCACA",
    //     borderColor: "#4DCACA",
    //     borderWidth: 1,
    //   },
    //   {
    //     label: "Service Portal",
    //     data: [5, 9, 3, 21, 21, 20, 40],
    //     fill: false,
    //     backgroundColor: "#C16473",
    //     borderColor: "#C16473",
    //     borderWidth: 1,
    //   },
    // ],
  };

  // const options = {
  //   scales: {
  //     yAxes: [
  //       {
  //         ticks: {
  //           beginAtZero: true,
  //         },
  //       },
  //     ],
  //   },
  // };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
      yAxes: [
        {
          gridLines: {
            color: "rgba(0, 0, 0, 0.2)",
            borderDash: [10, 10],
            drawBorder: false,
          },
          ticks: {
            stepSize: 50,
            padding: 15,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            color: "rgba(0, 0, 0, 0.2)",
            borderDash: [10, 10],
            drawBorder: false,
          },
          ticks: {
            padding: 15,
          },
        },
      ],
    },
    legend: {
      display: false,
    },
    tooltips: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      borderColor: "rgba(0, 0, 0, 0.2)",
      borderWidth: 1,
      xPadding: 10,
      yPadding: 10,
    },
  };
  // useEffect(() => {
  //   // line graph
  //   let myChart1 = document.getElementById("graph").getContext("2d");
  //   let Graph1 = new Chart(myChart1, {
  //     type: "line",
  //     data: {
  //       labels: ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"],
  //       datasets: datasetsArr1,
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //         },
  //         yAxes: [
  //           {
  //             gridLines: {
  //               color: "rgba(0, 0, 0, 0.2)",
  //               borderDash: [10, 10],
  //               drawBorder: false,
  //             },
  //             ticks: {
  //               stepSize: 50,
  //               padding: 15,
  //             },
  //           },
  //         ],
  //         xAxes: [
  //           {
  //             gridLines: {
  //               color: "rgba(0, 0, 0, 0.2)",
  //               borderDash: [10, 10],
  //               drawBorder: false,
  //             },
  //             ticks: {
  //               padding: 15,
  //             },
  //           },
  //         ],
  //       },
  //       legend: {
  //         display: false,
  //       },
  //       tooltips: {
  //         backgroundColor: "rgba(0, 0, 0, 0.75)",
  //         borderColor: "rgba(0, 0, 0, 0.2)",
  //         borderWidth: 1,
  //         xPadding: 10,
  //         yPadding: 10,
  //       },
  //     },
  //   });
  // }, []);
  return (
    <div className="line-chart">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChartCard;
