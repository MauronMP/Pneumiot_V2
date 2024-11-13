import React from "react";
import ReactECharts from "echarts-for-react";

const LineChart = ({ data }) => {
  // Mapeo de index_rate_id a colores
  const indexRateColors = {
    1: "#93CE07", // Verde para index_rate_id 1
    2: "#FBDB0F", // Naranja para index_rate_id 2
    3: "#FD0100", // Rojo para index_rate_id 3
  };

  // Transformar los datos para extraer las horas y las mediciones de humedad
  const hourlyData = data.map(item => ({
    hour: `${String(item.hour_time).padStart(2, "0")}:00`, // Hora formateada
    humidity: parseFloat(item.average_measure), // Valor de la humedad
    indexRateId: item.index_rate_id, // index_rate_id
  }));

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
        data: hourlyData.map((item) => item.hour), // Eje X con horas
        axisLabel: {
          interval: 0,
          rotate: 45, // Rotar etiquetas para legibilidad
        },
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Humidity",
          type: "line",
          data: hourlyData.map((item) => ({
            value: item.humidity, // Datos de humedad en el eje Y
            itemStyle: {
              color: indexRateColors[item.indexRateId] || "#999", // Asignar color según index_rate_id
            },
            symbol: "circle", // Usar círculos como símbolo para los puntos
            symbolSize: 15, // Tamaño de los puntos (círculos)
            lineStyle: {
              color: "black", // La línea será negra
              width: 8, // Grosor de la línea
            },
          })),
          markLine: {
            silent: true,
            lineStyle: { color: "#333" },
            data: [
              { yAxis: 50 }, // Línea de advertencia
              { yAxis: 75 }, // Línea de alerta
            ],
          },
        },
      ],
    };
  };

  return <ReactECharts option={getOption()} style={{ height: "400px", width: "100%" }} />;
};

export default LineChart;
