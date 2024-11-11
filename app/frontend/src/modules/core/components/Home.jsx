import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserInjured, FaClipboardList, FaUserMd, FaHeartbeat } from 'react-icons/fa'; // Import icons
import { useTranslation } from 'react-i18next'; // Import useTranslation hook for translations
import config from '../../../config/config';  // Import URL paths for apis

const HomePage = () => {
    const { t } = useTranslation('homepage'); // Se especifica el namespace 'homepage'

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
                setError(t('error'));
            } finally {
                // Set loading state to false once the data has been fetched
                setLoading(false);
            }
        };

        // Call the fetch function to load data
        fetchCounts();
    }, [t]); // Empty array means the effect runs only once on mount

    // Show loading message while data is being fetched
    if (loading) {
        return <div className="text-center mt-5">{t('loading')}</div>;
    }

    // Show error message if data fetching fails
    if (error) {
        return <div className="text-center mt-5 text-danger">{error}</div>;
    }

    return (
        <div className="d-flex flex-column">
            {/* Header section */}
            <div className="jumbotron bg-light text-dark p-5 shadow-lg rounded">
                <div className="container">
                    <h1 className="display-4 text-center mb-3">{t('welcomeMessage')}</h1>
                    <p className="lead text-center">{t('leadText')}</p>
                    <hr className="my-4" />
                    <p className="text-center">{t('description')}</p>
                </div>
            </div>

            {/* Cards for displaying counts with icons */}
            <div className="container mt-5"> {/* Aumentamos el margen superior a mt-5 */}
                <div className="row justify-content-center">
                    {/* Card for patient count */}
                    <div className="col-md-3 col-sm-6 mb-4 d-flex justify-content-center">
                        <div className="card w-100 h-100 border-0 shadow-sm text-center">
                            <div className="card-body">
                                <FaUserInjured size={50} className="mb-3 text-primary" />
                                <h5 className="card-title">{t('patients')}</h5>
                                <p className="card-text display-4">{patientCount}</p>
                            </div>
                        </div>
                    </div>

                    {/* Card for board count */}
                    <div className="col-md-3 col-sm-6 mb-4 d-flex justify-content-center">
                        <div className="card w-100 h-100 border-0 shadow-sm text-center">
                            <div className="card-body">
                                <FaClipboardList size={50} className="mb-3 text-success" />
                                <h5 className="card-title">{t('boards')}</h5>
                                <p className="card-text display-4">{boardCount}</p>
                            </div>
                        </div>
                    </div>

                    {/* Card for worker count */}
                    <div className="col-md-3 col-sm-6 mb-4 d-flex justify-content-center">
                        <div className="card w-100 h-100 border-0 shadow-sm text-center">
                            <div className="card-body">
                                <FaUserMd size={50} className="mb-3 text-warning" />
                                <h5 className="card-title">{t('workers')}</h5>
                                <p className="card-text display-4">{workerCount}</p>
                            </div>
                        </div>
                    </div>

                    {/* Card for sensor count */}
                    <div className="col-md-3 col-sm-6 mb-4 d-flex justify-content-center">
                        <div className="card w-100 h-100 border-0 shadow-sm text-center">
                            <div className="card-body">
                                <FaHeartbeat size={50} className="mb-3 text-danger" />
                                <h5 className="card-title">{t('sensors')}</h5>
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