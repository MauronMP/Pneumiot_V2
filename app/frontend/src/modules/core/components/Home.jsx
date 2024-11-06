import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserInjured, FaClipboardList, FaUserMd, FaHeartbeat } from 'react-icons/fa'; // Import icons
import config from '../../../config/config';  // Import URL paths for apis

const HomePage = () => {
    // States to store the counts for each category
    const [patientCount, setPatientCount] = useState(0);
    const [boardCount, setBoardCount] = useState(0);
    const [workerCount, setWorkerCount] = useState(0);
    const [sensorCount, setSensorCount] = useState(0);

    // States to handle loading and errors
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data from the API when the component mounts
    useEffect(() => {
        const fetchCounts = async () => {
            try {
                // Fetch counts for patients, boards, workers, and sensors concurrently
                const [patientRes, boardRes, workerRes, sensorRes] = await Promise.all([
                    fetch(`${config.frontendBaseUrl}patients/count`),
                    fetch(`${config.frontendBaseUrl}boards/count`),
                    fetch(`${config.frontendBaseUrl}workers/count`),
                    fetch(`${config.frontendBaseUrl}sensors/count`)
                ]);

                // Parse the JSON response from each API
                const patientData = await patientRes.json();
                const boardData = await boardRes.json();
                const workerData = await workerRes.json();
                const sensorData = await sensorRes.json();

                // Update the state with the fetched data
                setPatientCount(patientData.count);
                setBoardCount(boardData.count);
                setWorkerCount(workerData.count);
                setSensorCount(sensorData.count);
            } catch (error) {
                // Set error message if data fetching fails
                setError('Error al cargar los datos');
            } finally {
                // Set loading state to false once the data has been fetched
                setLoading(false);
            }
        };

        // Call the fetch function to load data
        fetchCounts();
    }, []); // Empty array means the effect runs only once on mount

    // Show loading message while data is being fetched
    if (loading) {
        return <div className="text-center mt-5">Cargando datos...</div>;
    }

    // Show error message if data fetching fails
    if (error) {
        return <div className="text-center mt-5 text-danger">{error}</div>;
    }

    return (
        <div>
            {/* Header section */}
            <div className="jumbotron bg-light text-dark p-5 shadow-lg rounded">
                <div className="container">
                    <h1 className="display-4 text-center mb-3">Welcome to Pneumiot</h1>
                    <p className="lead text-center">An advanced system for managing patients, devices, and clinic staff.</p>
                    <hr className="my-4" />
                    <p className="text-center">We provide an all-in-one solution for real-time patient monitoring and medical device tracking.</p>
                </div>

            </div>

            {/* Cards for displaying counts with icons */}
            <div className="container mt-5">
                <div className="row text-center">
                    {/* Card for patient count */}
                    <div className="col-md-3 mb-4">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body">
                                <FaUserInjured size={50} className="mb-3 text-primary" />
                                <h5 className="card-title">Patients</h5>
                                <p className="card-text display-4">{patientCount}</p>
                            </div>
                        </div>
                    </div>

                    {/* Card for board count */}
                    <div className="col-md-3 mb-4">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body">
                                <FaClipboardList size={50} className="mb-3 text-success" />
                                <h5 className="card-title">Boards</h5>
                                <p className="card-text display-4">{boardCount}</p>
                            </div>
                        </div>
                    </div>

                    {/* Card for worker count */}
                    <div className="col-md-3 mb-4">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body">
                                <FaUserMd size={50} className="mb-3 text-warning" />
                                <h5 className="card-title">Workers</h5>
                                <p className="card-text display-4">{workerCount}</p>
                            </div>
                        </div>
                    </div>

                    {/* Card for sensor count */}
                    <div className="col-md-3 mb-4">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body">
                                <FaHeartbeat size={50} className="mb-3 text-danger" />
                                <h5 className="card-title">Sensors</h5>
                                <p className="card-text display-4">{sensorCount}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;