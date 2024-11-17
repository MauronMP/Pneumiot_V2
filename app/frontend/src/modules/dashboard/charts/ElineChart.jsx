import React from "react";
import ReactECharts from "echarts-for-react";
import { useTranslation } from "react-i18next"; // Import the translation hook
import RiskLevelLegend from './chartLegend'; // Import the legend

const LineChart = ({ data, headerText }) => {
  const { t } = useTranslation('chartLegend'); // Get the translation function

  const indexRateColors = {
    1: "#93CE07", // Green (Optimal)
    2: "#FBDB0F", // Yellow (Acceptable)
    3: "#FD0100", // Red (Critical)
  };

  const hourlyData = data.map(item => ({
    hour: `${String(item.hour_time).padStart(2, "0")}:00`,
    humidity: parseFloat(item.average_measure),
    indexRateId: item.index_rate_id,
  }));

  const getOption = () => {
    return {
      tooltip: {
        trigger: "axis",
        formatter: (params) => {
          const { data } = params[0];
          const hour = params[0].name;
          const value = data.value;
          const indexRateId = data.indexRateId;

          // Use the translation function to fetch the correct tooltip content
          const riskText = t(`tooltip.${indexRateId}`) || t('tooltip.unknown'); // Fetch the correct risk text translation
          
          return `
            ${t('tooltip.hour')}: ${hour}<br/>
            ${t('tooltip.average')}: ${value}<br/>
            ${t('tooltip.risk_level')}: ${riskText}
          `;
        },
      },
      grid: { left: "5%", right: "15%", bottom: "20%" },
      xAxis: {
        type: "category",
        data: hourlyData.map((item) => item.hour),
        axisLabel: { interval: 0, rotate: 45 },
      },
      yAxis: { type: "value" },
      series: [
        {
          name: t('chart.humidity'), // Use translation for series name
          type: "line",
          data: hourlyData.map((item) => ({
            value: item.humidity,
            itemStyle: {
              color: indexRateColors[item.indexRateId] || "#999",
            },
            symbol: "circle",
            symbolSize: 15,
            lineStyle: { color: "black", width: 8 },
            indexRateId: item.indexRateId,
          })),
          markLine: {
            silent: true,
            lineStyle: { color: "#333" },
          },
        },
      ],
    };
  };

  return (
    <div>
      <h3 className="text-center">{headerText}</h3>
      <RiskLevelLegend /> {/* Insert the risk level legend here */}
      <ReactECharts option={getOption()} style={{ height: "400px", width: "100%" }} />
    </div>
  );
};

export default LineChart;