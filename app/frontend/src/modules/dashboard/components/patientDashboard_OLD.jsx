import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BarChart from '../charts/barChart';
import Calendar from '../charts/calendarChart';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/customStyles.css'; // Asegúrate de que la ruta sea correcta
import BarChartYear from '../charts/barChartYear';
import config from '../../../config/config';  // Import URL paths for apis
import { FaMicrochip, FaThermometerHalf, FaClock, FaCalendarAlt } from 'react-icons/fa';


const PatientDashboard = () => {
    const { id: patientId } = useParams();
    const [boardId, setBoardId] = useState('');
    const [boardCode, setBoardCode] = useState('');
    const [sensorId, setSensorId] = useState('');
    const [sensorName, setSensorName] = useState('Sensor no seleccionado');
    const [sensors, setSensors] = useState([]);
    const [timeView, setTimeView] = useState('Hour');
    const [barChartData, setBarChartData] = useState([]);
    const [barChartDataYear, setBarChartDataYear] = useState([]);
    const [startDate, setStartDate] = useState(getPreviousDate());
    const [endDate, setEndDate] = useState(getPreviousDate());
    const [minValue, setMinValue] = useState(null);
    const [maxValue, setMaxValue] = useState(null);
    const [avgValue, setAvgValue] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false); // Variable para habilitar/deshabilitar botones
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Por defecto, el año actual
    const [calendarData, setCalendarData] = useState([]);

    const handleYearChange = (year) => {
        setSelectedYear(year);
        fetchBarChartDataYear(); // Llama a la función para obtener los datos del año seleccionado
    };

    const handleTimeViewChange = (view) => {
        setTimeView(view);
        if (view !== 'Month') {
            setSelectedYear(new Date().getFullYear());
        }
    };



    // Función para obtener la fecha del día anterior
    function getPreviousDate() {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        return date.toISOString().split('T')[0];
    }

    const todayDate = new Date(); // Obtener la fecha actual
    function getYesterdayDate() {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        return date.toISOString().split('T')[0]; // Devuelve la fecha en formato YYYY-MM-DD
    }


    useEffect(() => {
        const fetchBoardData = async () => {
            try {
                const boardResponse = await fetch(`${config.frontendBaseUrl}patients/boardByPatientId/${patientId}`);
                const boardData = await boardResponse.json();

                setBoardCode(boardData.board_code);
                setBoardId(boardData.board_id);

                const sensorsResponse = await fetch(`${config.frontendBaseUrl}patients/sensorsByPatientAndBoard/${patientId}/${boardData.board_id}`);
                if (!sensorsResponse.ok) throw new Error('Error fetching sensors');

                const sensorsData = await sensorsResponse.json();
                setSensors(sensorsData);
                if (sensorsData.length > 0) {
                    setSensorId(sensorsData[0].sensor_id);
                }

            } catch (error) {
                console.error(error);
                alert('Ha habido un error al cargar los datos.');
                window.location.href = '/';
            }
        };

        fetchBoardData();
    }, [patientId]);

    const fetchBarChartData = async () => {
        if (!boardId || !sensorId || !startDate || timeView !== 'Hour') return;

        console.log(`${config.frontendBaseUrl}hourly-averages/getdata?patientId=${patientId}&boardId=${boardId}&sensorId=${sensorId}&dayDate=${startDate}`);
        try {
            const barChartResponse = await fetch(`${config.frontendBaseUrl}hourly-averages/getdata?patientId=${patientId}&boardId=${boardId}&sensorId=${sensorId}&dayDate=${startDate}`);
            if (!barChartResponse.ok) throw new Error('Error al obtener datos del BarChart');

            const apiData = await barChartResponse.json();
            if (!Array.isArray(apiData)) {
                console.error("apiData no es un array", apiData);
                return;
            }

            const formattedData = apiData.map(item => ({
                hour_time: item.hour_time,
                average_measure: parseFloat(item.average_measure),
                index_rate_id: item.index_rate_id,
                sensor_type: item.sensor_type
            }));

            console.log("BarChart formattedData:", formattedData);
            setBarChartData(formattedData);

            // Calcular min, max y avg
            const values = formattedData.map(item => item.average_measure);
            if (values.length > 0) {
                setMinValue(Math.min(...values));
                setMaxValue(Math.max(...values));
                setAvgValue(values.reduce((sum, value) => sum + value, 0) / values.length);
            }

        } catch (error) {
            console.error(error);
            alert('Ha habido un error al cargar los datos del BarChart.');
        }
    };

    const fetchBarChartDataYear = async () => {
        if (!boardId || !sensorId || timeView !== 'Month') return;

        // Construimos la URL con los parámetros correctos para los promedios mensuales
        const url = `${config.frontendBaseUrl}monthly-averages/monthly?patientId=${patientId}&boardId=${boardId}&sensorId=${sensorId}&yearNumber=${selectedYear}`;
        console.log(url); // Verificar la URL

        try {
            const barChartResponse = await fetch(url);
            if (!barChartResponse.ok) throw new Error('Error al obtener datos del BarChart');

            const apiData = await barChartResponse.json();
            if (!Array.isArray(apiData)) {
                console.error("apiData no es un array", apiData);
                return;
            }

            // Formatear los datos, combinando el mes y año
            const formattedDataYear = apiData.map(item => ({
                month_number: item.month_number, // Combina mes y año
                average_measure: parseFloat(item.average_measure),
                index_rate_id: item.index_rate_id,
                sensor_type: item.sensor_type
            }));

            console.log("BarChart formattedDataaaa:", formattedDataYear);
            setBarChartDataYear(formattedDataYear);

            // Calcular min, max y avg
            const values = formattedDataYear.map(item => item.average_measure);
            if (values.length > 0) {
                setMinValue(Math.min(...values));
                setMaxValue(Math.max(...values));
                setAvgValue(values.reduce((sum, value) => sum + value, 0) / values.length);
            }

        } catch (error) {
            console.error(error);
            alert('Ha habido un error al cargar los datos del BarChart.');
        }
    };


    const fetchCalendarData = async () => {
        if (timeView === 'Day' && boardId && sensorId && startDate && endDate) {
            try {
                const calendarResponse = await fetch(`${config.frontendBaseUrl}daily-averages/getdata?patientId=${patientId}&boardId=${boardId}&sensorId=${sensorId}&startDate=${startDate}&endDate=${endDate}`);
                if (!calendarResponse.ok) throw new Error('Error al obtener datos del Calendar');

                const apiData = await calendarResponse.json();

                // Verificar que apiData sea un array y tenga elementos
                if (!Array.isArray(apiData) || apiData.length === 0) {
                    console.error("apiData no es un array válido", apiData);
                    setCalendarData([]); // Asegúrate de establecer un valor por defecto para calendarData
                    return;
                }

                const formattedCalendarData = apiData.map(item => ({
                    day: item.day_date,
                    value: parseFloat(item.average_measure),
                    index_rate_id: item.index_rate_id, // Añadir index_rate_id
                }));

                // Calcular min, max y avg
                const values = formattedCalendarData.map(item => item.value);
                if (values.length > 0) {
                    setMinValue(Math.min(...values));
                    setMaxValue(Math.max(...values));
                    setAvgValue(values.reduce((sum, value) => sum + value, 0) / values.length);
                } else {
                    setMinValue(null);
                    setMaxValue(null);
                    setAvgValue(null);
                }

                setCalendarData(formattedCalendarData);
            } catch (error) {
                console.error(error);
                alert('Ha habido un error al cargar los datos del calendario.');
            }
        }
    };

    const handleDateChange = (type, value) => {
        let newStartDate = startDate;
        let newEndDate = endDate;
        let newErrorMessage = '';
        let isDisabled = false; // Flag para habilitar/deshabilitar botones
    
        if (type === 'start') {
            newStartDate = value;
            if (new Date(value) >= todayDate) {
                newErrorMessage = 'La fecha inicial no puede ser hoy o en el futuro.';
                isDisabled = true; // Bloquear botones
                newEndDate = ''; // Reiniciar endDate si hay error
            } else if (newEndDate && new Date(value) > new Date(newEndDate)) {
                newErrorMessage = 'La fecha inicial no puede ser posterior a la fecha final.';
                isDisabled = true; // Bloquear botones
                newEndDate = ''; // Reiniciar endDate si hay error
            }
        } else {
            newEndDate = value;
            if (new Date(value) < new Date(newStartDate)) {
                newErrorMessage = 'La fecha final no puede ser anterior a la fecha inicial.';
                isDisabled = true; // Bloquear botones
    
                // Espera de 3 segundos antes de redirigir a la misma página
                setTimeout(() => {
                    window.location.reload(); // Recargar la página
                }, 2000); // 3000 ms = 3 segundos
            }
        }
    
        setErrorMessage(newErrorMessage);
        if(!errorMessage){
            setStartDate(newStartDate);
            setEndDate(newEndDate);
            setIsSubmitDisabled(isDisabled); // Actualizar el estado de los botones
        }  
    };
    

    useEffect(() => {
        const fetchInitialData = async () => {
            await fetchBarChartData(); // Carga los datos del BarChart para la fecha inicial (ayer)
            await fetchCalendarData();
            await fetchBarChartDataYear(); // Carga los datos del BarChart para el año seleccionado
        };

        if (boardId && sensorId && !isSubmitDisabled) {
            fetchInitialData();
        }
    }, [boardId, sensorId, startDate, endDate, timeView, isSubmitDisabled, selectedYear]); // Añade selectedYear como dependencia

    return (
        <div className="container-fluid">
            <div className="row g-4">
                {/* Column for statistics */}
                <div className="col-md-2 col-sm-12">
                    <div className="card mb-3 shadow-sm text-center border-success bg-light">
                        <div className="card-body">
                            <h6 className="card-title">Average Values</h6>
                            <p className="card-text">{avgValue !== null ? avgValue.toFixed(2) : 'Loading...'}</p>
                        </div>
                    </div>
                    <div className="card mb-3 shadow-sm text-center border-danger bg-light">
                        <div className="card-body">
                            <h6 className="card-title">Maximum</h6>
                            <p className="card-text">{maxValue !== null ? maxValue.toFixed(2) : 'Loading...'}</p>
                        </div>
                    </div>
                    <div className="card mb-3 shadow-sm text-center border-success bg-light">
                        <div className="card-body">
                            <h6 className="card-title">Minimum</h6>
                            <p className="card-text">{minValue !== null ? minValue.toFixed(2) : 'Loading...'}</p>
                        </div>
                    </div>
                </div>

                {/* Column for form and charts */}
                <div className="col-md-10 col-sm-12">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title mb-4 text-center">Average Measures from Patient</h2>
                            <div className="d-flex flex-column gap-4">
                                {/* Row for selects */}
                                <div className="row g-4">
                                    {/* Board Select with Icon */}
                                    <div className="col-md-4 col-sm-12">
                                        <label htmlFor="boardSelect" className="form-label">
                                            <FaMicrochip className="me-2 text-primary" /> Board Identified
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light">
                                                <FaMicrochip className="text-primary" />
                                            </span>
                                            <select
                                                id="boardSelect"
                                                className="form-select"
                                                value={boardId}
                                                onChange={e => setBoardId(e.target.value)}
                                            >
                                                <option value="">{boardCode || 'Select Board'}</option>
                                            </select>
                                        </div>
                                    </div>
                                    {/* Sensor Select with Icon */}
                                    <div className="col-md-4 col-sm-12">
                                        <label htmlFor="sensorSelect" className="form-label">
                                            <FaThermometerHalf className="me-2 text-danger" /> Select a Sensor
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light">
                                                <FaThermometerHalf className="text-danger" />
                                            </span>
                                            <select
                                                id="sensorSelect"
                                                className="form-select"
                                                value={sensorId}
                                                onChange={e => setSensorId(e.target.value)}
                                            >
                                                <option value="">Select one sensor</option>
                                                {sensors.map(sensor => (
                                                    <option key={sensor.sensor_id} value={sensor.sensor_id}>
                                                        {sensor.sensor_type}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    {/* Time View Select with Icon */}
                                    <div className="col-md-3 col-sm-12">
                                        <label htmlFor="timeViewSelect" className="form-label">
                                            <FaClock className="me-2 text-warning" /> Select Time View
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light">
                                                <FaClock className="text-warning" />
                                            </span>
                                            <select
                                                id="timeViewSelect"
                                                className="form-select"
                                                value={timeView}
                                                onChange={e => handleTimeViewChange(e.target.value)}
                                            >
                                                <option value="Hour">Hour</option>
                                                <option value="Day">Day</option>
                                                <option value="Month">Month</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Row for time view and conditional inputs */}
                                <div className="row g-4 align-items-end mb-4">
                                    

                                    {/* Year Select if Month is selected */}
                                    {timeView === 'Month' && (
                                        <div className="col-md-3 col-sm-12">
                                            <label htmlFor="yearSelect" className="form-label">
                                                <FaCalendarAlt className="me-2 text-success" /> Select a Year
                                            </label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light">
                                                    <FaCalendarAlt className="text-success" />
                                                </span>
                                                <select
                                                    id="yearSelect"
                                                    className="form-select"
                                                    value={selectedYear}
                                                    onChange={e => handleYearChange(e.target.value)}
                                                >
                                                    {Array.from(
                                                        { length: new Date().getFullYear() - 2022 },
                                                        (_, i) => 2023 + i
                                                    ).map(year => (
                                                        <option key={year} value={year}>
                                                            {year}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    )}

                                    {/* Date inputs for Start and End Date */}
                                    {timeView !== 'Month' && (
                                        <>
                                            <div className="col-md-4 col-sm-12">
                                                <label htmlFor="startDate" className="form-label">
                                                    <FaCalendarAlt className="me-2 text-info" /> 
                                                    {(timeView == 'Day') && ( 
                                                        <span>Start Date</span> 
                                                    )}
                                                    {(timeView == 'Hour') && ( 
                                                        <span>Select one day</span> 
                                                    )}
                                                </label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-light">
                                                        <FaCalendarAlt className="text-info" />
                                                    </span>
                                                    <input
                                                        type="date"
                                                        id="startDate"
                                                        className="form-control"
                                                        value={startDate}
                                                        onChange={e => handleDateChange('start', e.target.value)}
                                                        max={getYesterdayDate()}
                                                    />
                                                </div>
                                            </div>

                                            {(timeView === 'Day' || isSubmitDisabled) && (
                                                <div className="col-md-4 col-sm-12">
                                                    <label htmlFor="endDate" className="form-label">
                                                        <FaCalendarAlt className="me-2 text-info" /> End Date
                                                    </label>
                                                    <div className="input-group">
                                                        <span className="input-group-text bg-light">
                                                            <FaCalendarAlt className="text-info" />
                                                        </span>
                                                        <input
                                                            type="date"
                                                            id="endDate"
                                                            className="form-control"
                                                            value={endDate}
                                                            onChange={e => handleDateChange('end', e.target.value)}
                                                            max={getYesterdayDate()}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>

                                {/* Error message */}
                                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                            </div>
                        </div>
                        {/* Charts */}

                    </div>

                        <div className="row mt-2 g-5">
                            <div className="col-12">
                                {timeView === 'Hour' && <BarChart data={barChartData} />}
                                {timeView === 'Day' && <Calendar data={calendarData} startDate={startDate} endDate={endDate} />}
                                {timeView === 'Month' && <BarChartYear data={barChartDataYear} />}
                            </div>
                        </div>

                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;
