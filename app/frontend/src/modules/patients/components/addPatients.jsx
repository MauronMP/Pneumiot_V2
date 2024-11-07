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

  const navigate = useNavigate(); // Hook to navigate to another page after successful submission

  // useEffect hook to generate a unique board code on component mount
  useEffect(() => {
    setBoardCode(crypto.randomUUID()); // Generate a unique UUID for the board
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
      await axios.post(`${config.frontendBaseUrl}patients/`, {
        patient_dni: dni,
        board_id: boardId,
        admission_date: finalAdmissionDate,
        discharge_date: finalDischargeDate,
      });

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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">{t('register_patient')}</h2>
          <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
            {/* DNI input field */}
            <div className="form-group mb-3">
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

            {/* Board code input (read-only) */}
            <div className="form-group mb-3">
              <label htmlFor="board_code">{t('board_code')}</label>
              <input
                type="text"
                className="form-control"
                id="board_code"
                value={boardCode}
                readOnly
              />
            </div>

            {/* Admission date input */}
            <div className="form-group mb-3">
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

            {/* Discharge date input */}
            <div className="form-group mb-3">
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

            {/* Date validation error message */}
            {dateError && <div className="alert alert-danger">{dateError}</div>}

            {/* Submit button (disabled if date validation fails) */}
            {loading ? (
              <button className="btn btn-primary w-100" disabled>
                {t('registering')}...
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={dateError !== ''} // Disable button if there are date errors
              >
                {t('register_patient')}
              </button>
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