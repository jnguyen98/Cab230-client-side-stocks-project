import React from "react";

import { Line } from "react-chartjs-2";

// Main chart component which is a line graph.
function Chart(props){
    const chartData = {
        labels: props.date,
        datasets: [
            {
                label: "Closing Price",
                fill: false,
                data: props.price,
                borderColor: "rgb(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderWidth: 1,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgb(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgb(75,192,192,1)",
                pointHoverBorderColor: "rgb(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10
            }
        ]

    }
    const hasStocks = () => props.length > 0;
    const DisplayChart = () => <div className="chart"><Line data={chartData}/></div>;
    const DisplayNothing = "";

    return (hasStocks() ? DisplayChart() : DisplayNothing);
};

export default Chart;