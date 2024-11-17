import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { useTranslation } from 'react-i18next'; // Importando el hook de traducción
import RiskLevelLegend from './chartLegend';

const BarChart = ({ data, headerText }) => {
  const chartRef = useRef(null);
  const { t } = useTranslation('chartLegend'); // Obtener la función de traducción

  useEffect(() => {
    // Abreviaciones de los meses
    const monthsAbbrev = [
      t('months.jan'), t('months.feb'), t('months.mar'), t('months.apr'),
      t('months.may'), t('months.jun'), t('months.jul'), t('months.aug'),
      t('months.sep'), t('months.oct'), t('months.nov'), t('months.dec')
    ];

    // Nombres completos de los meses
    const monthsFull = [
      t('months.jan_full'), t('months.feb_full'), t('months.mar_full'), t('months.apr_full'),
      t('months.may_full'), t('months.jun_full'), t('months.jul_full'), t('months.aug_full'),
      t('months.sep_full'), t('months.oct_full'), t('months.nov_full'), t('months.dec_full')
    ];

    // Inicializar los arrays para los valores y los index_rate_id
    const values = Array(12).fill(0); // Inicializamos todos los valores a 0
    const index_rate_ids = Array(12).fill(1); // Inicializamos index_rate_id a 1 por defecto

    // Procesar los datos recibidos para llenar los arrays
    data.forEach((item) => {
      const monthIndex = item.month_number - 1; // Mes en el rango 0-11
      values[monthIndex] = item.average_measure;
      index_rate_ids[monthIndex] = item.index_rate_id;
    });

    // Función de colores para las barras según el index_rate_id
    const getColorByIndexRateId = (index_rate_id) => {
      if (index_rate_id === 1) return '#93CE07'; // Verde
      if (index_rate_id === 2) return '#FBDB0F'; // Amarillo
      return '#FD0100'; // Rojo
    };

    // Configuración del gráfico
    const option = {
      title: {
        left: 'center',
        top: '20px',
        textStyle: {
          fontSize: 24,
          fontWeight: 'bold',
          color: '#333',
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          const monthAbbrev = params.name; // Abreviación del mes
          const value = params.value;
          const indexRateId = index_rate_ids[params.dataIndex];
          const riskText = t(`tooltip.${indexRateId}`) || t('tooltip.unknown'); // Usar traducciones para el nivel de riesgo

          // Encontramos el nombre completo del mes desde el array `monthsFull`
          const monthFull = monthsFull[monthsAbbrev.indexOf(monthAbbrev)];

          return `${t('tooltip.month')}: ${monthFull}<br/>${t('tooltip.average')}: ${value}<br/>${t('tooltip.risk_level')}: ${riskText}`;
        },
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        textStyle: {
          color: '#fff',
        },
        borderColor: '#ccc',
        borderWidth: 1,
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'center',
        data: [
          t('legend.optimal_condition'),
          t('legend.acceptable_condition'),
          t('legend.critical_condition'),
        ],
        icon: 'rect',
        itemWidth: 14,
        itemHeight: 14,
        textStyle: {
          fontSize: 14,
          color: '#333',
        },
      },
      xAxis: {
        type: 'category',
        data: monthsAbbrev, // Usamos las abreviaciones en el eje X
        axisLine: {
          lineStyle: {
            color: '#999',
          },
        },
        axisLabel: {
          color: '#666',
        },
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '30%'],
        axisLine: {
          lineStyle: {
            color: '#999',
          },
        },
        axisLabel: {
          color: '#666',
        },
        splitLine: {
          lineStyle: {
            color: '#eee',
          },
        },
      },
      series: [
        {
          name: t('chart.humidity'),
          type: 'bar',
          data: values,
          itemStyle: {
            color: (params) => {
              const index_rate_id = index_rate_ids[params.dataIndex];
              return getColorByIndexRateId(index_rate_id);
            },
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowBlur: 10,
            shadowOffsetX: 2,
            shadowOffsetY: 2,
          },
          barWidth: '60%',
          label: {
            show: true,
            position: 'top',
            formatter: '{c}',
            textStyle: {
              color: '#333',
              fontSize: 12,
            },
          },
        },
      ],
      backgroundColor: '#f9f9f9',
    };

    // Inicializar el gráfico
    const chart = echarts.init(chartRef.current);
    chart.setOption(option);

    // Manejo del cambio de tamaño de la ventana
    window.addEventListener('resize', () => chart.resize());

    // Cleanup al desmontar el componente
    return () => {
      window.removeEventListener('resize', () => chart.resize());
      chart.dispose();
    };
  }, [data, t]); // Actualizar el gráfico si los datos o las traducciones cambian

  return (
    <div className="container-fluid" style={{ minHeight: '400px' }}>
      <h3 className='text-center'>{headerText} </h3>
      <RiskLevelLegend />
      <div ref={chartRef} style={{ width: '100%', height: '40vh' }}></div>
    </div>
  );
};

export default BarChart;