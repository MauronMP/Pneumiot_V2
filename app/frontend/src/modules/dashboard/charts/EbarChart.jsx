import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const BarChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Genera los meses abreviados
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    // Inicializar arrays para los valores y el index_rate_id
    const values = Array(12).fill(0); // Inicializamos todos los valores a 0
    const index_rate_ids = Array(12).fill(1); // Inicializamos index_rate_id a 1 por defecto

    // Procesar los datos recibidos para llenar los arrays
    data.forEach((item) => {
      const monthIndex = item.month_number - 1; // Mes en el rango 0-11
      values[monthIndex] = item.average_measure;
      index_rate_ids[monthIndex] = item.index_rate_id;
    });

    // Colores para las barras según el index_rate_id
    const getColorByIndexRateId = (index_rate_id) => {
      if (index_rate_id === 1) return '#93CE07'; // Verde
      if (index_rate_id === 2) return '#FBDB0F'; // Amarillo
      return '#FD0100'; // Rojo
    };

    // Configuración del gráfico
    const option = {
      title: {
        text: 'Valores Medios Mensuales',
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
        formatter: '{b}<br/>Valor: {c}',
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
        data: ['0-100 (Verde)', '101-200 (Amarillo)', '>200 (Rojo)'],
        icon: 'rect',
        itemWidth: 14,
        itemHeight: 14,
        textStyle: {
          fontSize: 14,
          color: '#333',
        },
        formatter: (name) => {
          return `{color| } ${name}`;
        },
        rich: {
          color: {
            height: 12,
            backgroundColor: (params) => {
              if (params.name === '0-100 (Verde)') return '#93CE07';
              if (params.name === '101-200 (Amarillo)') return '#FBDB0F';
              return '#FD0100';
            },
          },
        },
      },
      xAxis: {
        type: 'category',
        data: months,
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
          name: 'Valor Medio',
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

    // Inicializa el gráfico
    const chart = echarts.init(chartRef.current);
    chart.setOption(option);

    // Maneja el cambio de tamaño de la ventana
    window.addEventListener('resize', () => chart.resize());

    // Limpieza al desmontar el componente
    return () => {
      window.removeEventListener('resize', () => chart.resize());
      chart.dispose();
    };
  }, [data]);

  return (
    <div className="container-fluid" style={{ minHeight: '400px' }}>
      <div ref={chartRef} style={{ width: '100%', height: '40vh' }}></div>
    </div>
  );
};

export default BarChart;