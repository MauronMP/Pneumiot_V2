import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useTranslation } from 'react-i18next'; // Import useTranslation for translations
import config from '../../../config/config';  // Import URL paths for APIs

const AddPatient = () => {
  const { t } = useTranslation('addPatient'); // Use the translation hook

  // State hooks to manage form data, loading state, error state, and date error state
  const [dni, setDni] = useState(''); // Patient's DNI (ID number)
  const [admissionDate, setAdmissionDate] = useState(''); // Admission date of the patient
  const [dischargeDate, setDischargeDate] = useState(''); // Discharge date of the patient
  const [boardCode, setBoardCode] = useState(''); // Unique board code for the patient
  const [loading, setLoading] = useState(false); // Loading state to show during submission
  const [error, setError] = useState(null); // General error state for form submission errors
  const [dateError, setDateError] = useState(''); // Error state for date validation
  const [showToast, setShowToast] = useState(false); // State to control showing success toast
  const [patientName, setPatientName] = useState('');
  const [patientSurname, setPatientSurname] = useState('');
  const [dateBirth, setDateBirth] = useState('');
  const [genre, setGenre] = useState(''); // Género (M, F, Otro)
  const [telephoneNumber, setTelephoneNumber] = useState('');
  const [direction, setDirection] = useState('');
  const [alergies, setAlergies] = useState('');
  const [medicalCondition, setMedicalCondition] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [emergencyPhoneNumber, setEmergencyPhoneNumber] = useState('');


  const navigate = useNavigate(); // Hook to navigate to another page after successful submission

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };
    
  // useEffect hook to generate a unique board code on component mount
  useEffect(() => {
    setBoardCode(generateUUID());
  }, []);

  // Function to validate the admission and discharge dates
  const validateDates = () => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    // Admission date cannot be earlier than today
    if (admissionDate && admissionDate < today) {
      setDateError(t('admission_date_error'));
      return false;
    }

    // Admission date cannot be the same as the discharge date
    if (admissionDate && dischargeDate && admissionDate === dischargeDate) {
      setDateError(t('admission_discharge_same_error'));
      return false;
    }

    // Admission date cannot be later than discharge date
    if (admissionDate && dischargeDate && admissionDate > dischargeDate) {
      setDateError(t('admission_later_than_discharge_error'));
      return false;
    }

    // Discharge date cannot be earlier than the admission date
    if (dischargeDate && dischargeDate < admissionDate) {
      setDateError(t('discharge_earlier_than_admission_error'));
      return false;
    }

    setDateError(''); // Reset date error if all validations pass
    return true;
  };

  // Run validation whenever admission or discharge dates change
  useEffect(() => {
    validateDates();
  }, [admissionDate, dischargeDate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Start loading state
    setError(null); // Reset error state

    // Validate the dates before proceeding with the API request
    if (!validateDates()) {
      setLoading(false); // Stop loading if date validation fails
      return;
    }

    try {
      // Create a new board (API call to create a new board record)
      const boardResponse = await axios.post(`${config.apiV1}boards/`, {
        board_code: boardCode,
      });

      const boardId = boardResponse.data.board_id; // Get the generated board ID from the response

      // If admission date is not provided, use today's date
      const finalAdmissionDate = admissionDate || new Date().toISOString();

      // If discharge date is not provided, send null
      const finalDischargeDate = dischargeDate || null;

      // Register the patient with the details provided
      const patientResponse = await axios.post(`${config.frontendBaseUrl}patients/`, {
        patient_dni: dni,
        board_id: boardId,
        admission_date: finalAdmissionDate,
        discharge_date: finalDischargeDate,
        patient_name: patientName,
        patient_surname: patientSurname,
        date_birth: dateBirth,
        genre: genre,
        telephone_number: telephoneNumber,
        direction: direction,
        alergies: alergies,
        medical_condition: medicalCondition,
        blood_type: bloodType,
        emergency_contact: emergencyContact,
        emergency_phone_number: emergencyPhoneNumber,
      });

      const patientId = patientResponse.data.patient_id; // Get the patient_id from the response

      // Prepare data for the second API call
      const patientInfo = {
        patient_id: patientId,
        patient_name: patientName,
        patient_surname: patientSurname,
        date_birth: dateBirth,
        genre: genre,
        telephone_number: telephoneNumber,
        direction: direction,
        alergies: alergies,
        medical_condition: medicalCondition,
        blood_type: bloodType,
        emergency_contact: emergencyContact,
        emergency_phone_number: emergencyPhoneNumber,
        admission_date: finalAdmissionDate, // Use the final admission date
      };

      // Make the second API call with the patient info
      await axios.post(`${config.frontendBaseUrl}patientsInfo/`, patientInfo);

      // Show success toast on successful registration
      setShowToast(true);

      // Redirect to patients list after a 2-second delay
      setTimeout(() => {
        navigate('/patients');
      }, 2000);

    } catch (err) {
      setError(t('registration_error')); // Set error message if something goes wrong
    } finally {
      setLoading(false); // Stop loading state once the request is complete
    }
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8"> {/* Aumentamos el ancho del formulario */}
          <h2 className="text-center mb-4">{t('register_patient')}</h2>
          <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
            {/* DNI y Código de Pizarra */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="dni">{t('patient_dni')}</label>
                <input
                  type="text"
                  className="form-control"
                  id="dni"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="board_code">{t('board_code')}</label>
                <input
                  type="text"
                  className="form-control"
                  id="board_code"
                  value={boardCode}
                  readOnly
                />
              </div>
            </div>

            {/* Nombre y Apellido */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="patient_name">{t('patient_name')}</label>
                <input
                  type="text"
                  className="form-control"
                  id="patient_name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="patient_surname">{t('patient_surname')}</label>
                <input
                  type="text"
                  className="form-control"
                  id="patient_surname"
                  value={patientSurname}
                  onChange={(e) => setPatientSurname(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Fecha de Nacimiento y Género */}
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="date_birth">{t('date_birth')}</label>
                <input
                  type="date"
                  className="form-control"
                  id="date_birth"
                  value={dateBirth}
                  onChange={(e) => setDateBirth(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="genre">{t('genre')}</label>
                <select
                  className="form-control"
                  id="genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  required
                >
                  <option value="">{t('select_genre')}</option>
                  <option value="M">{t('male')}</option>
                  <option value="F">{t('female')}</option>
                  <option value="Otro">{t('other')}</option>
                </select>
              </div>

              <div className="col-md-4">
                <label htmlFor="blood_type">{t('blood_type')}</label>
                <select
                  className="form-control"
                  id="blood_type"
                  value={bloodType}
                  onChange={(e) => setBloodType(e.target.value)}
                >
                  <option value="">{t('select_blood_type')}</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>

            {/* Teléfono y Dirección */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="telephone_number">{t('telephone_number')}</label>
                <input
                  type="tel"
                  className="form-control"
                  id="telephone_number"
                  value={telephoneNumber}
                  onChange={(e) => setTelephoneNumber(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="direction">{t('direction')}</label>
                <input
                  type="text"
                  className="form-control"
                  id="direction"
                  value={direction}
                  onChange={(e) => setDirection(e.target.value)}
                />
              </div>
            </div>

            {/* Alergias y Condiciones Médicas */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="alergies">{t('alergies')}</label>
                <textarea
                  className="form-control"
                  id="alergies"
                  value={alergies}
                  onChange={(e) => setAlergies(e.target.value)}
                  rows="2"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="medical_condition">{t('medical_condition')}</label>
                <textarea
                  className="form-control"
                  id="medical_condition"
                  value={medicalCondition}
                  onChange={(e) => setMedicalCondition(e.target.value)}
                  rows="2"
                />
              </div>
            </div>

            {/* Contacto de Emergencia y Teléfono */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="emergency_contact">{t('emergency_contact')}</label>
                <input
                  type="text"
                  className="form-control"
                  id="emergency_contact"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="emergency_phone_number">{t('emergency_phone_number')}</label>
                <input
                  type="tel"
                  className="form-control"
                  id="emergency_phone_number"
                  value={emergencyPhoneNumber}
                  onChange={(e) => setEmergencyPhoneNumber(e.target.value)}
                />
              </div>
            </div>

            {/* Fechas de Admisión y Alta */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="admission_date">{t('admission_date')}</label>
                <input
                  type="date"
                  className="form-control"
                  id="admission_date"
                  value={admissionDate}
                  onChange={(e) => setAdmissionDate(e.target.value)}
                />
                <small className="form-text text-muted">
                  {t('admission_date_note')}
                </small>
              </div>

              <div className="col-md-6">
                <label htmlFor="discharge_date">{t('discharge_date')}</label>
                <input
                  type="date"
                  className="form-control"
                  id="discharge_date"
                  value={dischargeDate}
                  onChange={(e) => setDischargeDate(e.target.value)}
                />
                <small className="form-text text-muted">
                  {t('discharge_date_note')}
                </small>
              </div>
            </div>

            {/* Date validation error message */}
            {dateError && <div className="alert alert-danger">{dateError}</div>}

            {/* Submit button (disabled if date validation fails) */}
            {loading ? (
              <button className="btn btn-primary w-100" disabled>
                {t('registering')}...
              </button>
            ) : (
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary w-50 mt-4"
                  disabled={dateError !== ''} // Disable button if there are date errors
                >
                  {t('register_patient')}
                </button>
              </div>
            )}

            {/* General error message if something went wrong */}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
          </form>
        </div>
      </div>

      {/* Bootstrap Toast for success notification */}
      <div
        className={`toast align-items-center text-bg-success border-0 position-fixed bottom-0 end-0 m-3 ${showToast ? 'show' : 'hide'}`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">
            {t('registration_success')}
          </div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
            onClick={() => setShowToast(false)} // Hide toast when clicked
          ></button>
        </div>
      </div>
    </div>
  );
};

export default AddPatient;