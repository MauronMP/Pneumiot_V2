import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFingerprint, FaTemperatureHigh, FaExclamationCircle } from 'react-icons/fa'; // Importing relevant icons for sensors
import { IoMdSwitch } from 'react-icons/io'; // Import another icon (IoMdSwitch not used, but can be used for future functionality)
import config from '../../../config/config';  // Import URL paths for apis

const EditPatient = () => {
    const { id: patientId } = useParams(); // Extract patient ID from the URL parameters using `useParams`
    const [patientData, setPatientData] = useState(null); // State to store patient data
    const [sensorData, setSensorData] = useState([]); // State to store sensor data associated with the patient
    const [boardCode, setBoardCode] = useState(null); // State to store board code (assigned to the patient)

    // Function to fetch patient details from the API using the patientId
    const fetchPatientDetails = async () => {
        try {
            // Fetch data from the API endpoint
            const response = await fetch(`${config.frontendBaseUrl}patients/${patientId}`);
            const data = await response.json();
            setPatientData(data); // Store the patient data in the state once fetched
        } catch (error) {
            console.error('Error fetching patient details:', error); // Error handling in case of failure
        }
    };

    // Function to fetch sensor details associated with the patient
    const fetchSensorDetails = async () => {
        try {
            // Fetch sensor data using patientId
            const response = await fetch(`${config.frontendBaseUrl}patients/details/${patientId}`);
            const data = await response.json();
            setSensorData(data); // Store sensor data in the state once fetched
            
            // If sensors are found, set board code based on the first sensor
            if (data.length > 0) {
                setBoardCode(data[0].board_code); // Assume all sensors belong to the same board (simplification)
            }
        } catch (error) {
            console.error('Error fetching sensor details:', error); // Error handling for sensor data fetching
        }
    };

    // useEffect hook to fetch patient and sensor details when the component is loaded
    useEffect(() => {
        fetchPatientDetails(); // Fetch the patient data
        fetchSensorDetails(); // Fetch associated sensor data
    }, [patientId]); // Dependency array ensures this effect runs only when patientId changes

    // If patient data is still loading, show a loading message
    if (!patientData) {
        return <p>Loading patient details...</p>; // Show loading text until patient data is fetched
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-sm border-light mb-4">
                        <div className="card-body">
                            <h2 className="card-title text-center text-primary mb-4">Patient's Details</h2>

                            {/* Patient Info Section: Displays basic information about the patient */}
                            <div className="mb-4">
                                <div className="card border-light">
                                    <div className="card-header bg-primary text-white">
                                        <h5 className="mb-0">Patient Information</h5>
                                    </div>
                                    <div className="card-body bg-light">
                                        {/* DNI (Patient's ID), Admission and Discharge Date */}
                                        <div className="d-flex justify-content-between mb-3">
                                            <strong>DNI:</strong>
                                            <span>{patientData.patient_dni}</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-3">
                                            <strong>Admission Date:</strong>
                                            <span>{new Date(patientData.admission_date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <strong>Discharge Date:</strong>
                                            <span>{patientData.discharge_date ? new Date(patientData.discharge_date).toLocaleDateString() : 'Not available'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Board Info Section: Displays board code related to the patient's sensors */}
                            <div className="mb-4">
                                <div className="card border-light">
                                    <div className="card-header bg-info text-white">
                                        <h5 className="mb-0">Board Information</h5>
                                    </div>
                                    <div className="card-body bg-light">
                                        <div className="d-flex justify-content-between">
                                            <strong>Board Code:</strong>
                                            <span>{boardCode || 'Not available'}</span> {/* Display board code, or 'Not available' if not found */}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sensors Info Section: Displays the details of all sensors associated with the patient */}
                            <div>
                                <div className="card-header bg-success text-white">
                                    <h5 className="mb-3">Associated Sensors</h5>
                                </div>
                                
                                {/* Check if sensor data is available and display */}
                                {sensorData.length > 0 ? (
                                    <div className="row">
                                        {sensorData.map((sensor, index) => (
                                            <div className="col-md-6 mb-3" key={index}>
                                                <div className="card shadow-sm border-light">
                                                    <div className="card-body bg-light">
                                                        {/* Display sensor type, ID, unit, and min/max values */}
                                                        <div className="d-flex align-items-center mb-3">
                                                            <FaFingerprint size={40} className="text-primary me-3" />
                                                            <div>
                                                                <h6 className="card-title"><strong>Sensor type: </strong>{sensor.sensor_type}</h6>
                                                                <p><strong>Sensor ID:</strong> {sensor.sensor_code}</p>
                                                                <p><strong>Unit:</strong> {sensor.unit_abbreviation.trim()}</p>
                                                                <div className="d-flex">
                                                                    <div className="me-4">
                                                                        <p><strong><FaTemperatureHigh /> Min Value:</strong> {sensor.min_value}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p><strong><FaExclamationCircle /> Max Value:</strong> {sensor.max_value}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>No sensors found for this patient.</p> // Display message if no sensors found
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPatient;