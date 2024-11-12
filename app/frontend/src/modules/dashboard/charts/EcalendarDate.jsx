import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

const CalendarChart = () => {
  const chartRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Función para generar datos aleatorios
  function getVirtualData(year) {
    const date = +echarts.time.parse(year + '-01-01');
    const end = +echarts.time.parse(+year + 1 + '-01-01');
    const dayTime = 3600 * 24 * 1000;
    const data = [];

    for (let time = date; time < end; time += dayTime) {
      const indexRateId = Math.floor(Math.random() * 3) + 1; // 1, 2 o 3
      const value = Math.floor(Math.random() * 10000);
      data.push([echarts.time.format(time, '{yyyy}-{MM}-{dd}', false), value, indexRateId]);
    }

    return data;
  }

  const option = {
    title: {
      top: 0,
      left: 'center',
      text: 'Calendario de Actividad',
      textStyle: {
        fontSize: isMobile ? 14 : 20, // Ajuste del tamaño de texto del título
      },
    },
    tooltip: {},
    visualMap: {
      min: 0,
      max: 3,
      type: 'piecewise',
      orient: 'horizontal',
      left: 'center',
      top: 40,
      pieces: [
        { value: 1, color: 'green' },
        { value: 2, color: 'yellow' },
        { value: 3, color: 'red' },
      ],
      itemHeight: isMobile ? 10 : 15, // Ajuste del tamaño de los ítems del visualMap
    },
    calendar: {
      top: 90,
      left: 30,
      right: 30,
      cellSize: isMobile ? [60, 60] : [30, 30], // Aumento de tamaño de celdas en móvil
      range: '2024',
      itemStyle: {
        borderWidth: 0.5,
      },
      yearLabel: { show: false },
    },
    series: {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data: getVirtualData('2024').map(([date, value, indexRateId]) => ({
        name: date,
        value: [date, value, indexRateId],
      })),
    },
    legend: {
      orient: 'horizontal',
      top: 'bottom',
      left: 'center',
      data: ['Verde', 'Amarillo', 'Rojo'],
      textStyle: {
        color: '#333',
        fontSize: isMobile ? 12 : 14, // Ajuste del tamaño de los textos de la leyenda
      },
    },
  };

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);
    chartInstance.setOption(option);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);  // Detecta cambios de tamaño de pantalla
      chartInstance.resize();  // Ajusta el tamaño del gráfico
    };

    window.addEventListener('resize', handleResize);

    return () => {
      chartInstance.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  return (
    <div
      style={{
        width: '100%',
        overflowX: 'auto', // Habilitar el desplazamiento horizontal
        padding: '0 10px',
      }}
    >
      <div
        ref={chartRef}
        style={{
          width: isMobile ? '1500px' : '100%', // Aumentar el ancho en móvil para que el gráfico sea más amplio
          height: '60vh',
          minHeight: '400px',
        }}
      ></div>
    </div>
  );
};

export default CalendarChart;