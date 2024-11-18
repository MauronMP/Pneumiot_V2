import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { useTranslation } from 'react-i18next'; // Importando el hook de traducción
import RiskLevelLegend from './chartLegend';

const CalendarChart = ({ data, headerText }) => {
  const chartRef = useRef(null);
  const { t, i18n } = useTranslation('chartLegend'); // Obtener la función de traducción e i18n para acceder al idioma
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Función para formatear los datos para ECharts
  const formatDataForECharts = (data) => {
    return data.map((item) => [
      item.day,           // Fecha en formato 'YYYY-MM-DD'
      item.value,         // Valor promedio del día
      item.index_rate_id // Índice de color (1, 2 o 3)
    ]);
  };

  // Función para obtener las primeras letras de los días según el idioma activo
  const getDayNames = (locale) => {
    if (locale === 'es') {
      return ['L', 'M', 'X', 'J', 'V', 'S', 'D']; // Español (lunes a domingo)
    }
    // Si el idioma es inglés o cualquier otro
    return ['M', 'T', 'W', 'T', 'F', 'S','S']; // Inglés (Sunday a Saturday)
  };

  // Función para obtener los nombres abreviados de los meses
  const getMonthNames = (locale) => {
    if (locale === 'es') {
      return ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']; // Español
    }
    // Si el idioma es inglés o cualquier otro
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; // Inglés
  };

  // Definir las opciones del gráfico
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const option = {
    title: {
      top: 0,
      left: 'center',
      textStyle: {
        fontSize: isMobile ? 14 : 20,
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        const { value } = params;
        const riskText = t(`tooltip.${value[2]}`) || t('tooltip.unknown'); // Obtener traducción para el nivel de riesgo
        const date = new Date(value[0]);
        const monthName = getMonthNames(i18n.language)[date.getMonth()]; // Obtener abreviatura del mes basado en el idioma actual
        const day = date.getDate();

        return `
          ${t('tooltip.day')}: ${day} ${monthName}<br/>
          ${t('tooltip.average')}: ${value[1]}<br/>
          ${t('tooltip.risk_level')}: ${riskText}
        `;
      },
    },
    visualMap: {
      min: 1,
      max: 3,
      type: 'piecewise',
      orient: 'horizontal',
      left: 'center',
      top: 40,
      show: false,
      pieces: [
        { value: 1, label: t('visual_map.very_good'), color: '#93CE07' },
        { value: 2, label: t('visual_map.normal'), color: '#FBDB0F' },
        { value: 3, label: t('visual_map.risky'), color: '#FD0100' },
      ],
      itemHeight: isMobile ? 10 : 15,
    },
    calendar: {
      top: 90,
      left: 30,
      right: 30,
      cellSize: isMobile ? [60, 60] : [60, 30],
      range: '2024', // Cambia según sea necesario
      itemStyle: {
        borderWidth: 2.5,
      },
      yearLabel: { show: true },
      monthLabel: {
        show: true,
        nameMap: getMonthNames(i18n.language), // Cambiar los meses según el idioma (abreviaciones)
      },
      dayLabel: {
        show: true, // Mostrar los días de la semana
        firstDay: 0, // Comenzar la semana desde el lunes
        nameMap: getDayNames(i18n.language), // Obtener los días de la semana según el idioma
      },
    },
    series: [
      {
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

    // Manejar el redimensionamiento
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      chartInstance.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      chartInstance.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile, data, i18n.language, option]); // Actualizar el gráfico cuando cambie el idioma

  return (
    <div
      style={{
        width: '100%',
        overflowX: 'auto',
        padding: '0 10px',
      }}
    >
      <h3 className='text-center'>{headerText}</h3>
      <RiskLevelLegend />
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
