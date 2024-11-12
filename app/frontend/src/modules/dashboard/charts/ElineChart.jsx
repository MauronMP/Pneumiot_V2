import React from "react";
import ReactECharts from "echarts-for-react";

const LineChart = () => {
  // Datos de ejemplo generados para un solo día (14-10-2024) desde las 00:00 hasta las 23:00
  const hourlyData = Array.from({ length: 24 }, (v, i) => [
    `${String(i).padStart(2, "0")}:00`, // Hora formateada
    Math.floor(Math.random() * 300), // Valores de AQI entre 0 y 300
  ]);

  // Configuración del gráfico
  const getOption = () => {
    return {
     
      tooltip: {
        trigger: "axis",
      },
      grid: {
        left: "5%",
        right: "15%",
        bottom: "15%",
      },
      xAxis: {
        type: "category",
        data: hourlyData.map((item) => item[0]), // Eje X con horas
        axisLabel: {
          interval: 0,
          rotate: 45, // Rotar etiquetas para legibilidad
        },
      },
      yAxis: {
        type: "value",
      },
      toolbox: {
        right: 10,
        feature: {
          restore: {},
          saveAsImage: {},
        },
      },
      visualMap: {
        top: 50,
        right: 10,
        pieces: [
          { gt: 0, lte: 100, color: "#93CE07" }, // Verde
          { gt: 100, lte: 200, color: "#FBDB0F" }, // Naranja
          { gt: 200, color: "#FD0100" }, // Rojo
        ],
        outOfRange: {
          color: "#999",
        },
      },
      series: [
        {
          name: "Beijing AQI",
          type: "line",
          data: hourlyData.map((item) => item[1]), // Datos de AQI
          markLine: {
            silent: true,
            lineStyle: { color: "#333" },
            data: [
              { yAxis: 100 }, // Línea de advertencia
              { yAxis: 200 }, // Línea de alerta
            ],
          },
        },
      ],
    };
  };

  return <ReactECharts option={getOption()} style={{ height: "400px", width: "100%" }} />;
};

export default LineChart;
