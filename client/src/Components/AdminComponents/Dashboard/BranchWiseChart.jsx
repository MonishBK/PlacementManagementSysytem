import React from "react";
import { Doughnut } from "react-chartjs-2";
// note: not remove chart.js/auto
import "chart.js/auto";

export const Batchdata = {
  // labels: ["MCA", "MBA", "B.Tech", "B.Arch", "Cvil"],
  labels: ["MCA", "MBA"],
  datasets: [
    {
      label: "Sales Income",
      // data: [25, 10, 3, 5, 2],
      data: [25, 10],
      backgroundColor: [
        "rgba(255, 99, 132)",
        "rgba(54, 162, 235)",
        // "rgba(255, 206, 86)",
        // "rgba(75, 192, 192)",
        // "rgba(153, 102, 255)",
        // "rgba(255, 159, 64)",
      ],
    },
  ],
};

export const option = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    title: {
      display: false,
      text: "Chart Title",
    },
    legend: {
      position: "bottom",
      align: "middle",
      labels: {
        usePointStyle: true,
        boxWidth: 6,
      },
    },
  },

  interaction: {
    mode: "index",
    intersect: true,
  },
};

const BranchWiseChart = ({Bdata}) => {

  console.log("from chart=>",Bdata)

  const data = {
    labels: ["MCA", "MBA"],
    datasets: [
      {
        label: "Sales Income",
        // data: [25, 10, 3, 5, 2],
        data: Bdata,
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          // "rgba(255, 206, 86)",
          // "rgba(75, 192, 192)",
          // "rgba(153, 102, 255)",
          // "rgba(255, 159, 64)",
        ],
      },
    ],
  };

  return <Doughnut data={data} options={option} />;
};
export default BranchWiseChart;
