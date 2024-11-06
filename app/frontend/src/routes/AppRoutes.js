import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Importing routing components to manage page navigation

// Importing components from various modules
import { HomePage } from '../modules/core'; // Home page component
import { LoginForm } from '../modules/auth'; // Login form component
import { AddWorker, SeeWorker, WorkerProfile } from '../modules/worker'; // Worker management components
import { Logs } from '../modules/logs'; // Logs components
import { SeePermissions, CreatePermissions } from '../modules/permissions'; // Permissions management components
import { Sensors, AddSensors } from '../modules/sensors'; // Sensors components
import { PatientsPage, EditPatient, AddPatient } from '../modules/patients'; // Patient management components
import { PatientDashboard } from '../modules/dashboard'; // Patient dashboard component
import { BoardWithSensors } from '../modules/boards'; // Board with sensors component

// Component that manages all the app's routes
const AppRoutes = () => {
  return (
    <Routes>
      {/* Defining the main routes of the app */}
      <Route path="/" element={<HomePage />} /> {/* Home page route */}
      <Route path="/PatientDashboard/:id" element={<PatientDashboard />} /> {/* Patient dashboard with dynamic id */}
      <Route path="/login" element={<LoginForm />} /> {/* Login page route */}
      <Route path="/add-worker" element={<AddWorker />} /> {/* Route to add a new worker */}
      <Route path="/see-worker" element={<SeeWorker />} /> {/* Route to view worker details */}
      <Route path="/see-permissions" element={<SeePermissions />} /> {/* Permissions viewing route */}
      <Route path="/create-permissions" element={<CreatePermissions />} /> {/* Route to create permissions */}
      <Route path="/logs" element={<Logs />} /> {/* logs */}
      <Route path="/sensors" element={<Sensors />} /> {/* List and management of sensors */}
      <Route path="/add-sensors" element={<AddSensors />} /> {/* Route to add new sensors */}
      <Route path="/profile" element={<WorkerProfile />} /> {/* Worker profile route */}
      <Route path="/patients" element={<PatientsPage />} /> {/* Patients listing page */}
      <Route path="/edit-patient/:id" element={<EditPatient />} /> {/* Route to edit patient details */}
      <Route path="/add-patient" element={<AddPatient />} /> {/* Route to add a new patient */}
      <Route path="/board-with-sensors" element={<BoardWithSensors />} /> {/* Board displaying sensors */}
      <Route path="*" element={<Navigate to="/" />} />  {/* Redirect to home page*/}
    </Routes>
  );
};

export default AppRoutes; // Exporting the AppRoutes component for use in the app