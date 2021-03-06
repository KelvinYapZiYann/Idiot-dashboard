export const basicOptions = {
    maintainAspectRatio: false,
    // legend: {
    //   display: false
    // },
    responsive: true
};

export let chartOptions = {
    ...basicOptions,
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "label",
      intersect: 0,
      position: "nearest"
    },
    scales: {
      yAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.0)",
            zeroLineColor: "transparent"
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 10,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }
      ],
  
      xAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(0,242,195,0.1)",
            zeroLineColor: "transparent"
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }
      ]
    }
};