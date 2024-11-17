import React, { useState, useEffect } from 'react';  // React library for building the component; useState and useEffect are React hooks used for state management and side effects
import { useParams } from 'react-router-dom';  // useParams hook from React Router for accessing route parameters (such as 'patientId')
import LineChart from '../charts/ElineChart';  // Custom component for rendering line charts
import BarChart from '../charts/EbarChart';  // Custom component for rendering bar charts
import CalendarChart from '../charts/EcalendarDate';  // Custom component for displaying calendar-based data
import 'bootstrap/dist/css/bootstrap.min.css';  // Importing Bootstrap CSS for predefined styles and layout utilities like grid system, responsive design, etc.
import '../styles/customStyles.css';  // Import custom styles for this component, likely for overriding Bootstrap defaults or adding custom design elements
import config from '../../../config/config';  // Import configuration file, likely containing API URLs or other environment-specific settings
import { FaMicrochip, FaThermometerHalf, FaClock, FaCalendarAlt } from 'react-icons/fa';  // Import Font Awesome icons for visual representation, such as sensors, temperature, time, and calendar icons
import { useTranslation } from 'react-i18next';  // Import useTranslation hook from react-i18next for handling language translations in the component

const PatientDashboard = () => {

    // useTranslation hook is used to access translation functions (from 'patientDashboard' namespace)
    const { t, i18n } = useTranslation('patientDashboard'); // For accessing translations

    // useParams is used to get the patientId from the URL
    const { id: patientId } = useParams();

    // State hooks for managing the patient details
    const [patientName, setPatientName] = useState('');  // Stores the patient's first name
    const [patientSurname, setPatientSurname] = useState('');  // Stores the patient's surname
    const [patientDni, setPatientDni] = useState('');  // Stores the patient's DNI (National ID number)
    const [dashboardHeaderText, setDashboardHeaderText] = useState('');  // Stores the text for the dashboard header (e.g., patient's name and DNI)

    // State hooks for managing the board and sensor information
    const [boardId, setBoardId] = useState('');  // Stores the board ID, which identifies the patient's board
    const [boardCode, setBoardCode] = useState('');  // Stores the board code, used to identify the board
    const [sensorId, setSensorId] = useState('');  // Stores the sensor ID for fetching sensor data
    const [sensors, setSensors] = useState([]);  // Stores an array of sensors associated with the patient's board

    // State hook to manage the time view (Hour, Day, Month, etc.)
    const [timeView, setTimeView] = useState('Hour');  // By default, set to 'Hour' view (can be switched to other time views)

    // State hooks for managing chart data (bar chart data for hourly, monthly, or daily averages)
    const [barChartData, setBarChartData] = useState([]);  // Stores data for the bar chart (hourly averages)
    const [barChartDataYear, setBarChartDataYear] = useState([]);  // Stores data for the bar chart for the selected year (monthly averages)

    // State hooks for managing date selection (start and end dates for filtering the data)
    const [startDate, setStartDate] = useState(getPreviousDate());  // Default start date is set to the previous day
    const [endDate, setEndDate] = useState(getPreviousDate());  // Default end date is also set to the previous day

    // State hooks for storing calculated statistics (min, max, avg) for data visualization
    const [minValue, setMinValue] = useState(null);  // Minimum value of the data to be displayed on the charts
    const [maxValue, setMaxValue] = useState(null);  // Maximum value of the data to be displayed on the charts
    const [avgValue, setAvgValue] = useState(null);  // Average value of the data to be displayed on the charts

    // State hooks for managing error messages and form submission state
    const [errorMessage, setErrorMessage] = useState('');  // Stores error messages to be displayed to the user
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);  // Determines whether the submit button is enabled or disabled

    // State hook for managing the selected year for viewing yearly data
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());  // By default, set to the current year

    // State hook for storing calendar data (used for displaying daily averages in a calendar format)
    const [calendarData, setCalendarData] = useState([]);  // Stores data for the calendar view

    // State hook for storing the header text, typically used for user instructions or status updates
    const [headerText, setHeaderText] = useState("Selecciona los filtros");  // Default text to prompt user to select filters

    // State hooks for managing sensor-related details
    const [sensorType, setSensorType] = useState('');  // Stores the type of sensor (e.g., temperature, pressure, etc.)
    const [unitAbbreviation, setUnitAbbreviation] = useState('');  // Stores the unit abbreviation (e.g., '°C', 'Pa') for the sensor data

    // Function to fetch and set sensor data based on the provided sensorId
    const fetchAndSetSensorData = async (sensorId) => {
        // If no sensorId is provided, exit the function
        if (!sensorId) return;

        try {
            // Fetch sensor data from the API using the provided sensorId
            const response = await fetch(`http://localhost:3000/api/frontend/sensors/sensorInformation/${sensorId}`);
            const data = await response.json(); // Parse the JSON data from the response

            // Destructure the relevant properties (sensor_type and Unit) from the response data
            const { sensor_type, Unit } = data;
            const trimmedUnitAbbreviation = Unit.unit_abbreviation.trim(); // Remove any extra whitespace from unit abbreviation

            // Translate the sensor type using i18next
            const translatedSensorType = t(sensor_type);  // Translate the sensor type

            // Update the component state with the translated sensor type and unit abbreviation
            setSensorType(translatedSensorType);
            setUnitAbbreviation(trimmedUnitAbbreviation);

            // Call the updateHeaderText function to update the header with translated values
            updateHeaderText(translatedSensorType, trimmedUnitAbbreviation);
        } catch (error) {
            // Log any errors and show an alert with an error message if data fetching fails
            console.error(error);
            alert(t('errorLoadingSensorData'));
        }
    };

    // Effect hook that runs whenever language, sensorType, or unitAbbreviation changes
    useEffect(() => {
        // Re-translate the sensor type and unit abbreviation if the language changes
        if (sensorType && unitAbbreviation) {
            updateHeaderText(sensorType, unitAbbreviation);
        }
    }, [i18n.language, sensorType, unitAbbreviation]); // Dependencies: re-run if the language, sensorType, or unitAbbreviation changes


    // Function to update the header text based on sensor type, unit abbreviation, and time view
    const updateHeaderText = (sensorTypeParam = sensorType, unitAbbreviationParam = unitAbbreviation) => {
        let title = t('average') + " ";  // Use the translation of "Average"
        title += `${sensorTypeParam} (${unitAbbreviationParam})`;  // Add sensor type and unit abbreviation to the title

        if (timeView) {
            // Adjust title based on the selected time view (Hour, Day, or Month)
            if (timeView === "Hour") {
                const day = startDate ? new Date(startDate).toLocaleDateString(i18n.language, { day: '2-digit', month: '2-digit', year: 'numeric' }) : t('noSelected');
                title += ` ${t('at')} ${day} `;
            } else if (timeView === "Day") {
                const start = startDate ? new Date(startDate).toLocaleDateString(i18n.language, { day: '2-digit', month: '2-digit', year: 'numeric' }) : t('noSelected');
                const end = endDate ? new Date(endDate).toLocaleDateString(i18n.language, { day: '2-digit', month: '2-digit', year: 'numeric' }) : t('noSelected');
                title += ` ${t('from')} ${start} ${t('to')} ${end} `;
            } else if (timeView === "Month") {
                const year = startDate ? new Date(startDate).getFullYear() : t('noSelected');
                title += ` ${t('atYear')} ${year} `;
            }
        }

        // Set the title to the header text after trimming any unnecessary spaces
        setHeaderText(title.trim());
    };

    // Function to handle sensor change, updating the sensor ID and fetching new data
    const handleSensorChange = (e) => {
        const newSensorId = e.target.value;  // Get the new sensor ID from the event
        setSensorId(newSensorId);  // Update the sensor ID state
        fetchAndSetSensorData(newSensorId);  // Fetch new sensor data using the new ID
    };

    // Function to handle year selection change and fetch data for the selected year
    const handleYearChange = (year) => {
        setSelectedYear(year);  // Set the selected year state
        fetchBarChartDataYear();  // Fetch bar chart data for the selected year
    };

    // Function to handle time view change and update header text accordingly
    const handleTimeViewChange = (view) => {
        setTimeView(view);  // Set the time view state to the selected view
        if (view !== 'Month') {
            setSelectedYear(new Date().getFullYear());  // Reset the selected year if time view is not "Month"
        }
        updateHeaderText();  // Update the header text
    };

    // Function to get the previous date (yesterday's date)
    function getPreviousDate() {
        const date = new Date();
        date.setDate(date.getDate() - 1);  // Subtract 1 day from today's date
        return date.toISOString().split('T')[0];  // Return the date in YYYY-MM-DD format
    }

    // Store today's date for use in various operations
    const todayDate = new Date();  // Get the current date

    // Function to get yesterday's date
    function getYesterdayDate() {
        const date = new Date();
        date.setDate(date.getDate() - 1);  // Subtract 1 day from today's date
        return date.toISOString().split('T')[0];  // Return the date in YYYY-MM-DD format
    }

    // useEffect to fetch and set data related to the patient's board and sensors
    useEffect(() => {
        const fetchBoardData = async () => {
            try {
                // Fetch the board data using the patientId
                const boardResponse = await fetch(`http://localhost:3000/api/frontend/patients/boardByPatientId/${patientId}`);
                const boardData = await boardResponse.json();

                // Set board code and ID from the fetched data
                setBoardCode(boardData.board_code);
                setBoardId(boardData.board_id);

                // Fetch sensor data using the patientId and boardId
                const sensorsResponse = await fetch(`http://localhost:3000/api/frontend/patients/sensorsByPatientAndBoard/${patientId}/${boardData.board_id}`);
                if (!sensorsResponse.ok) throw new Error('Error fetching sensors');

                const sensorsData = await sensorsResponse.json();

                // Translate sensor types to the current language
                const translatedSensors = sensorsData.map(sensor => ({
                    ...sensor,
                    sensor_type: t(sensor.sensor_type)  // Use 't' to translate sensor type
                }));

                setSensors(translatedSensors);
                if (translatedSensors.length > 0) {
                    setSensorId(translatedSensors[0].sensor_id);  // Set the first sensor ID
                }

            } catch (error) {
                console.error(error);
                alert(t('errorLoadingData'));  // Show error alert if fetching fails
                window.location.href = '/';  // Redirect to home
            }
        };

        fetchBoardData();  // Call the function to fetch board data
    }, [patientId, t]);  // Ensure 't' is in the dependency array for language changes

    // useEffect to fetch patient information including name, surname, and DNI
    useEffect(() => {
        const fetchBoardData = async () => {
            try {
                // Fetch patient info using the patientId
                const patientInfoResponse = await fetch(`http://localhost:3000/api/frontend/patientsInfo/${patientId}`);
                const patientInfoData = await patientInfoResponse.json();

                // Extract and set patient name and surname
                const { patient_name, patient_surname } = patientInfoData;
                setPatientName(patient_name);
                setPatientSurname(patient_surname);

                // Fetch the patient's DNI using the patientId
                const patientDniResponse = await fetch(`http://localhost:3000/api/frontend/patients/${patientId}`);
                const patientDniData = await patientDniResponse.json();

                // Extract and set patient DNI
                const { patient_dni } = patientDniData;
                setPatientDni(patient_dni);

            } catch (error) {
                console.error(error);
                alert(t('errorLoadingData'));  // Show error alert if fetching fails
                window.location.href = '/';  // Redirect to home
            }
        };

        fetchBoardData();  // Call the function to fetch patient data
    }, [patientId]);  // Re-run when patientId changes

    // Function to fetch bar chart data based on the current sensor and date
    const fetchBarChartData = async () => {
        if (!boardId || !sensorId || !startDate || timeView !== 'Hour') return;  // Early exit if conditions are not met

        // Fetch sensor data and set state for chart rendering
        fetchAndSetSensorData(sensorId);
        setSensorId(sensorId);
        setStartDate(startDate);
        setTimeView(timeView);

        try {
            // Fetch bar chart data from the API
            const barChartResponse = await fetch(`http://localhost:3000/api/frontend/hourly-averages/getdata?patientId=${patientId}&boardId=${boardId}&sensorId=${sensorId}&dayDate=${startDate}`);
            if (!barChartResponse.ok) throw new Error('Error al obtener datos del BarChart');  // Handle error if fetch fails

            const apiData = await barChartResponse.json();
            if (!Array.isArray(apiData)) {
                console.error("apiData no es un array", apiData);  // Ensure the response is an array
                return;
            }

            // Format the fetched data to match the expected structure
            const formattedData = apiData.map(item => ({
                hour_time: item.hour_time,
                average_measure: parseFloat(item.average_measure),
                index_rate_id: item.index_rate_id,
                sensor_type: item.sensor_type
            }));

            setBarChartData(formattedData);  // Set the formatted data for the bar chart

            // Calculate min, max, and average values from the formatted data
            const values = formattedData.map(item => item.average_measure);
            if (values.length > 0) {
                setMinValue(Math.min(...values));  // Calculate minimum value
                setMaxValue(Math.max(...values));  // Calculate maximum value
                setAvgValue(values.reduce((sum, value) => sum + value, 0) / values.length);  // Calculate average value
            }

        } catch (error) {
            console.error(error);
            alert(t('barChartError'));  // Show error alert if fetching bar chart data fails
        }
    };

    // Function to fetch bar chart data for a specific year (monthly averages)
    const fetchBarChartDataYear = async () => {
        if (!boardId || !sensorId || timeView !== 'Month') return;  // Early exit if conditions are not met

        // Fetch sensor data and set state for year-based chart rendering
        fetchAndSetSensorData(sensorId);
        setSensorId(sensorId);
        setStartDate(startDate);
        setTimeView(timeView);

        // Build the URL with parameters for monthly averages
        const url = `http://localhost:3000/api/frontend/monthly-averages/monthly?patientId=${patientId}&boardId=${boardId}&sensorId=${sensorId}&yearNumber=${selectedYear}`;
        try {
            // Fetch data for the monthly bar chart
            const barChartResponse = await fetch(url);
            if (!barChartResponse.ok) throw new Error('Error al obtener datos del BarChart');

            const apiData = await barChartResponse.json();
            if (!Array.isArray(apiData)) {
                console.error("apiData no es un array", apiData);
                return;
            }

            // Format the data by combining month and year
            const formattedDataYear = apiData.map(item => ({
                month_number: item.month_number,  // Combine month and year
                average_measure: parseFloat(item.average_measure),
                index_rate_id: item.index_rate_id,
                sensor_type: item.sensor_type
            }));
            setBarChartDataYear(formattedDataYear);

            // Calculate min, max, and avg values for the year data
            const values = formattedDataYear.map(item => item.average_measure);
            if (values.length > 0) {
                setMinValue(Math.min(...values));  // Min value
                setMaxValue(Math.max(...values));  // Max value
                setAvgValue(values.reduce((sum, value) => sum + value, 0) / values.length);  // Avg value
            }

        } catch (error) {
            console.error(error);
            alert(t('barChartError'));  // Alert if fetching bar chart data fails
        }
    };

    // Function to fetch calendar data for the selected time period (daily averages)
    const fetchCalendarData = async () => {
        if (timeView === 'Day' && boardId && sensorId && startDate && endDate) {
            // Fetch sensor data and set state for daily averages calendar view
            fetchAndSetSensorData(sensorId);
            setSensorId(sensorId);
            setStartDate(startDate);
            setEndDate(endDate);
            setTimeView(timeView);

            try {
                // Fetch daily averages data from the API
                const calendarResponse = await fetch(`http://localhost:3000/api/frontend/daily-averages/getdata?patientId=${patientId}&boardId=${boardId}&sensorId=${sensorId}&startDate=${startDate}&endDate=${endDate}`);
                if (!calendarResponse.ok) throw new Error('Error al obtener datos del Calendar');
                const apiData = await calendarResponse.json();

                // Ensure the fetched data is an array and has items
                if (!Array.isArray(apiData) || apiData.length === 0) {
                    console.error("apiData no es un array válido", apiData);
                    setCalendarData([]);  // Set empty data if validation fails
                    return;
                }

                // Format the data for calendar display
                const formattedCalendarData = apiData.map(item => ({
                    day: item.day_date,
                    value: parseFloat(item.average_measure),
                    index_rate_id: item.index_rate_id,  // Include index_rate_id for additional details
                }));

                // Calculate min, max, and avg values for the calendar data
                const values = formattedCalendarData.map(item => item.value);
                if (values.length > 0) {
                    setMinValue(Math.min(...values));  // Min value
                    setMaxValue(Math.max(...values));  // Max value
                    setAvgValue(values.reduce((sum, value) => sum + value, 0) / values.length);  // Avg value
                } else {
                    setMinValue(null);  // Reset values if no data
                    setMaxValue(null);
                    setAvgValue(null);
                }

                setCalendarData(formattedCalendarData);  // Set the formatted calendar data

            } catch (error) {
                console.error(error);
                alert('Ha habido un error al cargar los datos del calendario.');  // Alert for error in fetching calendar data
            }
        }
    };

    // Function to handle date changes for start and end dates
    const handleDateChange = (type, value) => {
        let newStartDate = startDate;
        let newEndDate = endDate;
        let newErrorMessage = '';
        let isDisabled = false;  // Flag to enable/disable buttons based on date logic

        if (type === 'start') {
            newStartDate = value;
            if (new Date(value) >= todayDate) {
                newErrorMessage = 'La fecha inicial no puede ser hoy o en el futuro.';
                isDisabled = true;  // Disable buttons if the start date is today or in the future
                newEndDate = '';  // Reset end date if error occurs
            } else if (newEndDate && new Date(value) > new Date(newEndDate)) {
                newErrorMessage = 'La fecha inicial no puede ser posterior a la fecha final.';
                isDisabled = true;  // Disable buttons if the start date is later than the end date
                newEndDate = '';  // Reset end date
            }
        } else {
            newEndDate = value;
            if (new Date(value) < new Date(newStartDate)) {
                newErrorMessage = 'La fecha final no puede ser anterior a la fecha inicial.';
                isDisabled = true;  // Disable buttons if end date is earlier than start date

                // Wait for 3 seconds before reloading the page
                setTimeout(() => {
                    window.location.reload();  // Reload the page after 3 seconds
                }, 2000);
            }
        }

        setErrorMessage(newErrorMessage);  // Set the error message if any
        if (!errorMessage) {
            setStartDate(newStartDate);  // Update the start date
            setEndDate(newEndDate);  // Update the end date
            setIsSubmitDisabled(isDisabled);  // Update the state for button disabling
        }

        updateHeaderText();  // Update the header text with the new dates
    };

    // useEffect to fetch the initial data for bar chart, calendar, and year-based bar chart
    useEffect(() => {
        const fetchInitialData = async () => {
            await fetchBarChartData();  // Fetch initial bar chart data (yesterday's data)
            await fetchCalendarData();  // Fetch calendar data based on selected start and end dates
            await fetchBarChartDataYear();  // Fetch bar chart data for the selected year
        };

        if (boardId && sensorId && !isSubmitDisabled) {
            fetchInitialData();  // Only fetch if conditions are met
        }
    }, [boardId, sensorId, startDate, endDate, timeView, isSubmitDisabled, selectedYear]);  // Add selectedYear as a dependency to re-fetch when it changes

    // useEffect to update the dashboard header text with patient name, surname, and DNI
    useEffect(() => {
        if (patientName && patientSurname && patientDni) {
            setDashboardHeaderText(`${patientName} ${patientSurname} - DNI: ${patientDni}`);  // Update the header with patient details
        }
    }, [patientName, patientSurname, patientDni]);  // Re-run when patient details change

    return (
        <div className="container-fluid" style={{ backgroundColor: "#F7FAFC", color: "#2D3748", display: "flex", flexDirection: "column" }}>
            <div className="row g-3 flex-grow-1">
                {/* Main card for the form */}
                <div className="col-12 mt-4">
                    <div className="card shadow-sm border-0 rounded-4" style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0" }}>
                        <div className="card-body">
                            <h2 className="card-title mb-4 text-center" style={{ color: "#2D3748" }}>{dashboardHeaderText}</h2>
                            <div className="d-flex flex-column gap-4">
                                {/* Row for selects */}
                                <div className="row g-3">
                                    {/* Board Select with Icon */}
                                    <div className="col-md-4 col-12">
                                        <label htmlFor="boardSelect" className="form-label" style={{ color: "#4A5568" }}>
                                            <FaMicrochip className="me-2" style={{ color: "#38B2AC" }} /> {t('selectBoard')}
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text" style={{ backgroundColor: "#EDF2F7", borderColor: "#E2E8F0" }}>
                                                <FaMicrochip style={{ color: "#38B2AC" }} />
                                            </span>
                                            <select
                                                id="boardSelect"
                                                className="form-select shadow-sm rounded-end"
                                                value={boardId}
                                                onChange={e => setBoardId(e.target.value)}
                                                style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", color: "#2D3748" }}
                                            >
                                                <option value="">{boardCode || t('selectBoardOption')}</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Sensor Select with Icon */}
                                    <div className="col-md-4 col-12">
                                        <label htmlFor="sensorSelect" className="form-label" style={{ color: "#4A5568" }}>
                                            <FaThermometerHalf className="me-2" style={{ color: "#38B2AC" }} /> {t('selectSensor')}
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text" style={{ backgroundColor: "#EDF2F7", borderColor: "#E2E8F0" }}>
                                                <FaThermometerHalf style={{ color: "#38B2AC" }} />
                                            </span>
                                            <select
                                                id="sensorSelect"
                                                className="form-select shadow-sm rounded-end"
                                                value={sensorId}
                                                onChange={handleSensorChange}
                                                style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", color: "#2D3748" }}
                                            >
                                                <option value="">{t('selectOneSensor')}</option>
                                                {sensors.map(sensor => (
                                                    <option key={sensor.sensor_id} value={sensor.sensor_id}>
                                                        {sensor.sensor_type}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Time View Select with Icon */}
                                    <div className="col-md-3 col-12">
                                        <label htmlFor="timeViewSelect" className="form-label" style={{ color: "#4A5568" }}>
                                            <FaClock className="me-2" style={{ color: "#63B3ED" }} /> {t('selectTimeView')}
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text" style={{ backgroundColor: "#EDF2F7", borderColor: "#E2E8F0" }}>
                                                <FaClock style={{ color: "#63B3ED" }} />
                                            </span>
                                            <select
                                                id="timeViewSelect"
                                                className="form-select shadow-sm rounded-end"
                                                value={timeView}
                                                onChange={e => handleTimeViewChange(e.target.value)}
                                                style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", color: "#2D3748" }}
                                            >
                                                <option value="Hour">{t('hour')}</option>
                                                <option value="Day">{t('day')}</option>
                                                <option value="Month">{t('month')}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Conditional row for time view and date selection */}
                                <div className="row g-3 align-items-end mb-4">
                                    {/* Year Select if Month is selected */}
                                    {timeView === 'Month' && (
                                        <div className="col-md-3 col-12">
                                            <label htmlFor="yearSelect" className="form-label" style={{ color: "#4A5568" }}>
                                                <FaCalendarAlt className="me-2" style={{ color: "#63B3ED" }} /> {t('selectYear')}
                                            </label>
                                            <div className="input-group">
                                                <span className="input-group-text" style={{ backgroundColor: "#EDF2F7", borderColor: "#E2E8F0" }}>
                                                    <FaCalendarAlt style={{ color: "#63B3ED" }} />
                                                </span>
                                                <select
                                                    id="yearSelect"
                                                    className="form-select shadow-sm rounded-end"
                                                    value={selectedYear}
                                                    onChange={e => handleYearChange(e.target.value)}
                                                    style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", color: "#2D3748" }}
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

                                    {/* Start and End Date Inputs */}
                                    {timeView !== 'Month' && (
                                        <>
                                            <div className="col-md-4 col-12">
                                                <label htmlFor="startDate" className="form-label" style={{ color: "#4A5568" }}>
                                                    <FaCalendarAlt className="me-2" style={{ color: "#63B3ED" }} />
                                                    {(timeView === 'Day') && <span>{t('startDate')}</span>}
                                                    {(timeView === 'Hour') && <span>{t('selectOneSensor')}</span>}
                                                </label>
                                                <div className="input-group">
                                                    <span className="input-group-text" style={{ backgroundColor: "#EDF2F7", borderColor: "#E2E8F0" }}>
                                                        <FaCalendarAlt style={{ color: "#63B3ED" }} />
                                                    </span>
                                                    <input
                                                        type="date"
                                                        id="startDate"
                                                        className="form-control shadow-sm rounded-end"
                                                        value={startDate}
                                                        onChange={e => handleDateChange('start', e.target.value)}
                                                        max={getYesterdayDate()}
                                                        style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", color: "#2D3748" }}
                                                    />
                                                </div>
                                            </div>

                                            {(timeView === 'Day' || isSubmitDisabled) && (
                                                <div className="col-md-4 col-12">
                                                    <label htmlFor="endDate" className="form-label" style={{ color: "#4A5568" }}>
                                                        <FaCalendarAlt className="me-2" style={{ color: "#63B3ED" }} /> {t('endDate')}
                                                    </label>
                                                    <div className="input-group">
                                                        <span className="input-group-text" style={{ backgroundColor: "#EDF2F7", borderColor: "#E2E8F0" }}>
                                                            <FaCalendarAlt style={{ color: "#63B3ED" }} />
                                                        </span>
                                                        <input
                                                            type="date"
                                                            id="endDate"
                                                            className="form-control shadow-sm rounded-end"
                                                            value={endDate}
                                                            onChange={e => handleDateChange('end', e.target.value)}
                                                            max={getYesterdayDate()}
                                                            style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", color: "#2D3748" }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>

                                {/* Error Message */}
                                {errorMessage && (
                                    <div className="alert alert-danger" style={{ backgroundColor: "#F56565", color: "#1A202C" }}>
                                        {t('errorMessage')}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chart section */}
                <div className="col-12 mt-5">
                    <div className="card-body">
                        {/* Row for both Statistics and Charts */}
                        <div className="row g-4">
                            {/* Column for statistics */}
                            <div className="col-md-2 col-12 pt-5 mt-5">
                                <div className="card mb-3 shadow-sm text-center border-success bg-light">
                                    <div className="card-body">
                                        <h6 className="card-title">{t('averageValues')}</h6>
                                        <p className="card-text">{avgValue !== null ? avgValue.toFixed(2) : t('loading')}</p>
                                    </div>
                                </div>
                                <div className="card mb-3 shadow-sm text-center border-danger bg-light">
                                    <div className="card-body">
                                        <h6 className="card-title">{t('maximum')}</h6>
                                        <p className="card-text">{maxValue !== null ? maxValue.toFixed(2) : t('loading')}</p>
                                    </div>
                                </div>
                                <div className="card mb-3 shadow-sm text-center border-success bg-light">
                                    <div className="card-body">
                                        <h6 className="card-title">{t('minimum')}</h6>
                                        <p className="card-text">{minValue !== null ? minValue.toFixed(2) : t('loading')}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Column for charts */}
                            <div className="col-md-10 col-12">
                                {/* Conditional Rendering for Charts */}
                                {timeView === 'Hour' && <LineChart data={barChartData} headerText={headerText} />}
                                {timeView === 'Day' && <CalendarChart data={calendarData} startDate={startDate} endDate={endDate} headerText={headerText} />}
                                {timeView === 'Month' && <BarChart data={barChartDataYear} headerText={headerText} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;