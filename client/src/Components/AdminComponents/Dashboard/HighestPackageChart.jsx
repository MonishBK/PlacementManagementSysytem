import React from "react";
import { Bar } from "react-chartjs-2";
// note: not remove chart.js/auto
import "chart.js/auto";

const HighestPackageChart = ({pData}) => {

  const [pack_arr,packs_label] = pData
  
  return (
    <Bar
      data={{
        labels: packs_label,
        datasets: [
          {
            label: "in LPA",
            data: pack_arr,
            backgroundColor: "#065bcb",
            barThickness: 18,
          },
        ],
      }}
      options={{
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          Bar: {},
        },
        plugins: {
          title: {
            display: false,
            text: "Chart Title",
          },
          legend: {
            position: "bottom",
            align: "start",
            display: true,
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
      }}
      // width={{100%}}
      height={240}
    />
  );
};
export default HighestPackageChart;
