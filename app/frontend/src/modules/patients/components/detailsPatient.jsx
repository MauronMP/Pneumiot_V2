import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFingerprint, FaTemperatureHigh, FaExclamationCircle } from 'react-icons/fa'; // Importar los íconos relevantes para los sensores
import { IoMdSwitch } from 'react-icons/io'; // Importar otro ícono (IoMdSwitch no utilizado, pero puede usarse para futuras funcionalidades)
import { useTranslation } from 'react-i18next'; // Importar useTranslation para la localización
import config from '../../../config/config';  // Importar las rutas de las API

const EditPatient = () => {
    const { id: patientId } = useParams(); // Extraer el ID del paciente de los parámetros de la URL usando `useParams`
    const { t } = useTranslation('detailsPatient'); // Usar useTranslation para acceder a las traducciones
    const [patientData, setPatientData] = useState(null); // Estado para almacenar los datos del paciente
    const [sensorData, setSensorData] = useState([]); // Estado para almacenar los datos de los sensores asociados al paciente
    const [boardCode, setBoardCode] = useState(null); // Estado para almacenar el código de la placa (asignada al paciente)

    // Función para obtener los detalles del paciente desde la API utilizando el patientId
    const fetchPatientDetails = async () => {
        try {
            // Obtener los datos desde el endpoint de la API
            const response = await fetch(`${config.frontendBaseUrl}patients/${patientId}`);
            const data = await response.json();
            setPatientData(data); // Almacenar los datos del paciente en el estado una vez obtenidos
        } catch (error) {
            console.error('Error fetching patient details:', error); // Manejo de errores en caso de fallo
        }
    };

    // Función para obtener los detalles de los sensores asociados al paciente
    const fetchSensorDetails = async () => {
        try {
            // Obtener los datos de los sensores utilizando el patientId
            const response = await fetch(`${config.frontendBaseUrl}patients/details/${patientId}`);
            const data = await response.json();
            setSensorData(data); // Almacenar los datos de los sensores en el estado una vez obtenidos
            
            // Si se encuentran sensores, establecer el código de la placa basándose en el primer sensor
            if (data.length > 0) {
                setBoardCode(data[0].board_code); // Asumir que todos los sensores pertenecen a la misma placa (simplificación)
            }
        } catch (error) {
            console.error('Error fetching sensor details:', error); // Manejo de errores para la obtención de los datos de los sensores
        }
    };

    // Hook useEffect para obtener los detalles del paciente y los sensores cuando se carga el componente
    useEffect(() => {
        fetchPatientDetails(); // Obtener los datos del paciente
        fetchSensorDetails(); // Obtener los datos asociados a los sensores
    }, [patientId]); // El array de dependencias asegura que este efecto se ejecute solo cuando cambie el patientId

    // Si los datos del paciente aún están cargando, mostrar un mensaje de carga
    if (!patientData) {
        return <p>{t('loading_patient_details')}</p>; // Mostrar el texto de carga traducido
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-sm border-light mb-4">
                        <div className="card-body">
                            <h2 className="card-title text-center text-primary mb-4">{t('patient_details')}</h2>

                            {/* Sección de información del paciente */}
                            <div className="mb-4">
                                <div className="card border-light">
                                    <div className="card-header bg-primary text-white">
                                        <h5 className="mb-0">{t('patient_information')}</h5>
                                    </div>
                                    <div className="card-body bg-light">
                                        {/* DNI (ID del paciente), fecha de admisión y fecha de alta */}
                                        <div className="d-flex justify-content-between mb-3">
                                            <strong>{t('dni')}:</strong>
                                            <span>{patientData.patient_dni}</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-3">
                                            <strong>{t('admission_date')}:</strong>
                                            <span>{new Date(patientData.admission_date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <strong>{t('discharge_date')}:</strong>
                                            <span>{patientData.discharge_date ? new Date(patientData.discharge_date).toLocaleDateString() : t('not_available')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sección de información de la placa */}
                            <div className="mb-4">
                                <div className="card border-light">
                                    <div className="card-header bg-info text-white">
                                        <h5 className="mb-0">{t('board_information')}</h5>
                                    </div>
                                    <div className="card-body bg-light">
                                        <div className="d-flex justify-content-between">
                                            <strong>{t('board_code')}:</strong>
                                            <span>{boardCode || t('not_available')}</span> {/* Mostrar el código de la placa, o 'No disponible' si no se encuentra */}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sección de sensores asociados */}
                            <div>
                                <div className="card-header bg-success text-white">
                                    <h5 className="mb-3">{t('associated_sensors')}</h5>
                                </div>
                                
                                {/* Verificar si los datos de sensores están disponibles y mostrarlos */}
                                {sensorData.length > 0 ? (
                                    <div className="row">
                                        {sensorData.map((sensor, index) => (
                                            <div className="col-md-6 mb-3" key={index}>
                                                <div className="card shadow-sm border-light">
                                                    <div className="card-body bg-light">
                                                        {/* Mostrar el tipo de sensor, ID, unidad y valores mínimos/máximos */}
                                                        <div className="d-flex align-items-center mb-3">
                                                            <FaFingerprint size={40} className="text-primary me-3" />
                                                            <div>
                                                                <h6 className="card-title"><strong>{t('sensor_type')}:</strong> {sensor.sensor_type}</h6>
                                                                <p><strong>{t('sensor_id')}:</strong> {sensor.sensor_code}</p>
                                                                <p><strong>{t('unit')}:</strong> {sensor.unit_abbreviation.trim()}</p>
                                                                <div className="d-flex">
                                                                    <div className="me-4">
                                                                        <p><strong><FaTemperatureHigh /> {t('min_value')}:</strong> {sensor.min_value}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p><strong><FaExclamationCircle /> {t('max_value')}:</strong> {sensor.max_value}</p>
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
                                    <p>{t('no_sensors_found')}</p> // Mostrar mensaje si no se encuentran sensores
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