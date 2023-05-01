import React from "react";
import { Line } from "react-chartjs-2";
// note: not remove chart.js/auto
import "chart.js/auto";

// export const data = {
//   labels: ["2017", "2018", "2019", "2020", "2021"],
//   datasets: [
//     {
//       label: "Year",
//       data: [200, 250, 160, 210, 190, 170],
//       backgroundColor: "#0057ca",
//       tension: 0.5,
//     },
//   ],
// };

// export const option = {
//   indexAxis: "x",
//   responsive: true,
//   maintainAspectRatio: false,

//   plugins: {
//     title: {
//       display: false,
//       text: "Chart Title",
//     },
//     legend: {
//       position: "bottom",
//       align: "middle",
//       labels: {
//         usePointStyle: true,
//         boxWidth: 0,
//       },
//     },
//   },

//   interaction: {
//     mode: "index",
//     intersect: true,
//   },

//   scales: {
//     x: {
//       stacked: true,
//       grid: {
//         display: false,
//       },
//     },

//     y: {
//       stacked: true,
//       grid: {
//         display: false,
//       },
//     },
//   },
// };

const PlacedStudentChart = ({placed}) => {

  const [Unique_Placed_Years,Placed_Count] = placed
  console.log("from placed Charts=>",placed)

  const data = {
    labels: Unique_Placed_Years,
    datasets: [
      {
        label: "Year",
        data: Placed_Count,
        backgroundColor: "#0057ca",
        tension: 0.5,
      },
    ],
  };
  
  const option = {
    indexAxis: "x",
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
          boxWidth: 0,
        },
      },
    },
  
    interaction: {
      mode: "index",
      intersect: true,
    },
  
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
  
      y: {
        stacked: true,
        grid: {
          display: false,
        },
      },
    },
  };




  return <Line data={data} options={option} height={280} />;
};
export default PlacedStudentChart;
