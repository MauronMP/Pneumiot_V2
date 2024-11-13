import React from 'react';
// Importando ResponsiveCalendar desde @nivo/calendar para renderizar el gráfico de calendario
import { ResponsiveCalendar } from '@nivo/calendar';
// Importando la función utilitaria para obtener los colores según el indexRateId
import { getColor } from '../../../utils/colorUtils';
import Legend from './legend';

const CalendarChart = ({ data, startDate, endDate }) => {
    // Comprobar si los datos están vacíos o no disponibles
    if (!data || data.length === 0) {
        return <div>No hay datos disponibles para mostrar.</div>;
    }

    // Transformar los datos entrantes para ajustarse al formato esperado por ResponsiveCalendar
    const calendarData = data.map(item => ({
        day: item.day,               // Fecha en formato 'YYYY-MM-DD'
        value: item.value,           // Valor para cada día
        color: getColor(item.indexRateId), // Color basado en indexRateId
    }));

    return (
        <div style={{ height: '400px', width: '100%' }}>
            <Legend />
            <ResponsiveCalendar
                data={calendarData}
                from={startDate}       // Fecha de inicio
                to={endDate}           // Fecha de fin
                emptyColor="#eeeeee"   // Color para los días sin datos
                margin={{ top: 10, right: 40, bottom: 40, left: 40 }}
                yearSpacing={40}       // Espaciado entre los años
                monthBorderColor="#ffffff"
                dayBorderColor="#ffffff"
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        translateY: 36,
                        itemCount: 3,
                        itemWidth: 42,
                        itemHeight: 20,
                        itemsSpacing: 14,
                        itemDirection: 'left-to-right',
                        symbolSize: 20,
                        symbolShape: 'circle',
                    },
                ]}
                // Estilo para cada día, asignando el color correspondiente
                theme={{
                    tooltip: {
                        container: {
                            background: '#333',
                            color: '#fff',
                            fontSize: 12,
                        },
                    },
                }}
                dayBorderWidth={2}
                dayColor={({ value, color }) => color}
                tooltip={({ day, value }) => (
                    <strong>
                        {day}: {value !== undefined ? value : 'Sin datos'}
                    </strong>
                )}
            />
        </div>
    );
};

export default CalendarChart;
