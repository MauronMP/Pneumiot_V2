import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

const CalendarChart = ({ data }) => {
  const chartRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Función para transformar los datos recibidos al formato esperado por ECharts
  const formatDataForECharts = (data) => {
    return data.map((item) => [
      item.day,           // Fecha en formato 'YYYY-MM-DD'
      item.value,         // Valor promedio del día
      item.index_rate_id  // Índice de color (1, 2 o 3)
    ]);
  };

  // Definir opción del gráfico
  const option = {
    title: {
      top: 0,
      left: 'center',
      text: 'Calendario de Actividad',
      textStyle: {
        fontSize: isMobile ? 14 : 20,
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        const { value } = params;
        return `Fecha: ${value[0]}<br/>Valor: ${value[1]}<br/>Nivel de Riesgo: ${value[2]}`;
      },
    },
    visualMap: {
      min: 1,
      max: 3,
      type: 'piecewise',
      orient: 'horizontal',
      left: 'center',
      top: 40,
      pieces: [
        { value: 1, label: 'Muy Bueno', color: 'green' },
        { value: 2, label: 'Normal', color: 'yellow' },
        { value: 3, label: 'Riesgoso', color: 'red' },
      ],
      itemHeight: isMobile ? 10 : 15,
    },
    calendar: {
      top: 90,
      left: 30,
      right: 30,
      cellSize: isMobile ? [60, 60] : [60, 30],
      range: '2024', // Cambiar esto según sea necesario
      itemStyle: {
        borderWidth: 2.5,
      },
      yearLabel: { show: true },
    },
    series: [
      {
        name: 'Nivel de Actividad', // Añadir nombre para la serie
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: formatDataForECharts(data),
        animation: true,
        animationDuration: 1500,
        animationEasing: 'elasticOut',
        animationDelay: (idx) => idx * 5,
      },
    ],
  };

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);
    chartInstance.setOption(option);

    // Función para manejar el resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      chartInstance.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      chartInstance.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile, data]); // Actualizar el gráfico si cambia el tamaño o los datos

  return (
    <div
      style={{
        width: '100%',
        overflowX: 'auto',
        padding: '0 10px',
      }}
    >
      <div
        ref={chartRef}
        style={{
          width: isMobile ? '1500px' : '100%',
          height: '40vh',
          minHeight: '500px',
        }}
      ></div>
    </div>
  );
};

export default CalendarChart;