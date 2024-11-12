import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const BarChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Genera los meses abreviados
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    // Genera valores aleatorios y asigna index_rate_id aleatorio (1 = verde, 2 = amarillo, 3 = rojo)
    const values = [];
    const index_rate_ids = [];
    for (let i = 0; i < months.length; i++) {
      const value = Math.floor(Math.random() * 300); // Valor aleatorio entre 0 y 300
      const index_rate_id = Math.floor(Math.random() * 3) + 1; // Genera aleatoriamente 1, 2 o 3

      values.push(value);
      index_rate_ids.push(index_rate_id);
    }

    // Colores para las barras según el index_rate_id
    const getColorByIndexRateId = (index_rate_id) => {
      if (index_rate_id === 1) {
        return '#93CE07'; // Verde
      } else if (index_rate_id === 2) {
        return '#FBDB0F'; // Amarillo
      } else {
        return '#FD0100'; // Rojo
      }
    };

    // Configuración del gráfico
    const option = {
      title: {
        text: 'Gráfico de Barras con Colores Aleatorios',
        left: 'center',
        top: '20px',
        textStyle: {
          fontSize: 24,
          fontWeight: 'bold',
          color: '#333'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}<br/>Valor: {c}',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        textStyle: {
          color: '#fff'
        },
        borderColor: '#ccc',
        borderWidth: 1,
      },
      legend: {
        orient: 'vertical', // La leyenda se muestra en columna
        right: 10, // Posicionamos la leyenda a la derecha
        top: 'center', // Centramos la leyenda verticalmente
        data: ['Very good', 'Normal', 'Risky'], // Los elementos de la leyenda
        icon: 'rect', // Icono de rectángulo para la leyenda
        itemWidth: 14, // Tamaño del rectángulo
        itemHeight: 14, // Tamaño del rectángulo
        textStyle: {
          fontSize: 14,
          color: '#333'
        },
        // Se agregan los colores para los rectángulos de la leyenda
        formatter: (name) => {
          let color;
          if (name === 'Very good') color = '#93CE07'; // Verde
          else if (name === 'Normal') color = '#FBDB0F'; // Amarillo
          else color = '#FD0100'; // Rojo

          return `{color| } ${name}`; // Formateamos con el color
        },
        rich: {
          color: {
            height: 12,
            backgroundColor: function (params) {
              // Asignamos el color adecuado a cada categoría de la leyenda
              if (params.name === 'Very good') return '#93CE07';
              else if (params.name === 'Normal') return '#FBDB0F';
              else return '#FD0100';
            },
          },
        },
      },
      xAxis: {
        type: 'category',
        data: months, // Los meses en el eje X
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '30%'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        },
        splitLine: {
          lineStyle: {
            color: '#eee'
          }
        }
      },
      series: [
        {
          name: 'Valor Medio',
          type: 'bar',
          data: values, // Valores generados aleatoriamente
          itemStyle: {
            normal: {
              color: function (params) {
                const index_rate_id = index_rate_ids[params.dataIndex]; // Obtener index_rate_id correspondiente
                return getColorByIndexRateId(index_rate_id); // Asignar color según el index_rate_id
              },
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowBlur: 10,
              shadowOffsetX: 2,
              shadowOffsetY: 2,
            }
          },
          barWidth: '60%', // Ancho de las barras aumentado a 60%
          label: {
            show: true,
            position: 'top',
            formatter: '{c}',
            textStyle: {
              color: '#333',
              fontSize: 12
            }
          },
        }
      ],
      backgroundColor: '#f9f9f9', // Color de fondo
    };

    // Inicializa el gráfico
    const chart = echarts.init(chartRef.current);
    chart.setOption(option);

    // Responde al cambio de tamaño de la ventana
    window.addEventListener('resize', () => {
      chart.resize();
    });

    // Limpieza del gráfico
    return () => {
      window.removeEventListener('resize', () => chart.resize());
      chart.dispose();
    };
  }, []);

  return (
    <div className="container-fluid" style={{ backgroundColor: "#F7FAFC", color: "#2D3748", display: "flex", flexDirection: "column", minHeight: '400px' }}>
      <div className="row g-3 flex-grow-1">
        <div className="col-12 mt-4">
          <div ref={chartRef} style={{ width: '100%', height: '100%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
