import React from 'react';
// Importando ResponsiveCalendar desde @nivo/calendar para renderizar el gráfico de calendario
import { ResponsiveCalendar } from '@nivo/calendar';
// Importando la función utilitaria para obtener los colores según el indexRateId
import { getColor } from '../../../utils/colorUtils';
import Legend from './legend'; 

const CalendarChart = ({ data, startDate, endDate }) => {
    // Comprobar si los datos están vacíos o no disponibles
    if (!data || data.length === 0) {
        return <div>No hay datos disponibles para mostrar.</div>; // Mensaje si no hay datos
    }

    // Transformar los datos entrantes para ajustarse al formato esperado por ResponsiveCalendar
    const transformedData = data.map(item => ({
        day: item.day,  // Asegurarse de que 'day' corresponda a 'day_date'
        value: item.value, // Valor para cada día
        color: getColor(item.indexRateId), // Obtener el color basado en indexRateId
    }));

    // Crear la data para el ResponsiveCalendar, utilizando solo 'day' y 'value'
    const calendarData = transformedData.map(({ day, value, color }) => ({
        day,
        value,
        color, // Incluir el color calculado
    }));

    return (
        <div style={{ height: '400px' }}>
            <Legend /> 
            {/* Componente ResponsiveCalendar */}
            <ResponsiveCalendar
                data={calendarData} // Pasar los datos transformados al calendario
                from={startDate} // Usar startDate desde las props
                to={endDate}     // Usar endDate desde las props
                emptyColor="#eeeeee" // Color para los días sin datos
                margin={{ top: 10, right: 40, bottom: 40, left: 40 }} // Márgenes para el calendario
                yearSpacing={40} // Espaciado entre los años
                monthBorderColor="#ffffff" // Color del borde de los meses
                dayBorderColor="#ffffff" // Color del borde de los días
                legends={[
                    {
                        anchor: 'bottom', // Posicionar la leyenda en la parte inferior
                        direction: 'row', // Colocar los íconos de la leyenda en fila
                        translateY: 36, // Desplazar la leyenda hacia abajo
                        itemCount: 3, // Número de colores en la leyenda
                        itemWidth: 42, // Ancho de cada item de la leyenda
                        itemHeight: 36, // Altura de cada item de la leyenda
                        itemsSpacing: 14, // Espaciado entre los items de la leyenda
                    },
                ]}
                // Definir el estilo dinámico para cada día, usando 'color' de los datos transformados
                dayBorderWidth={1}
                dayStyle={({ day }) => ({
                    backgroundColor: day.color, // Aplicar el color correspondiente al día
                })}
            />
        </div>
    );
};

export default CalendarChart;
