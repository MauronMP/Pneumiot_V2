import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { 
  FaUserCog, FaUserPlus, FaUser, 
  FaStethoscope, FaRegEdit, 
  FaRegEye, FaUserFriends, FaChevronDown, 
  FaChevronUp, FaClipboardList
} from 'react-icons/fa';
import { MdDevicesOther } from 'react-icons/md';
import '../design-system/components/SideBar.scss';

const SideBar = ({ isOpen }) => {
  const [openPatients, setOpenPatients] = useState(false);
  const [openDevice, setOpenDevice] = useState(false);
  const [openDashboard, setOpenDashboard] = useState(false);
  const [openAdminPanel, setOpenAdminPanel] = useState(false);
  const [openWorkers, setOpenWorkers] = useState(false);
  const [openPermissions, setOpenPermissions] = useState(false);
  const [openLogs, setOpenLogs] = useState(false);

  const togglePatients = () => setOpenPatients(!openPatients);
  const toggleDevice = () => setOpenDevice(!openDevice);
  const toggleAdminPanel = () => setOpenAdminPanel(!openAdminPanel);
  const toggleWorkers = () => setOpenWorkers(!openWorkers);
  const togglePermissions = () => setOpenPermissions(!openPermissions);
  const toggleLogs = () => setOpenLogs(!openLogs);

  // Recuperar datos del usuario desde sessionStorage
  const loginData = sessionStorage.getItem('loginData');
  const user = loginData ? JSON.parse(loginData) : null;
  const workerName = user?.workerDetails?.worker_name;
  const workerSurname = user?.workerDetails?.worker_surname;
  const workerRole = user?.workerDetails?.worker_role_name;

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <Nav className="flex-column">
        {user && (
          <Nav.Item className="sidebar-user-info">
            <Nav.Link href="#">
              <div className="user-info">
                <span className="user-greeting">Hola,</span>
                <span className="user-name">{workerName} {workerSurname}</span>
              </div>
            </Nav.Link>
          </Nav.Item>
        )}

        {/* Admin Panel Section */}
        {(workerRole === 'admin') && (
          <Nav.Item>
            <Nav.Link 
              className="d-flex align-items-center" 
              onClick={toggleAdminPanel}
              href="#"
            >
              <FaUserCog className="sidebar-icon" /> Admin Panel
              {openAdminPanel ? <FaChevronUp /> : <FaChevronDown />}
            </Nav.Link>
            {openAdminPanel && (
              <Nav className="flex-column submenu">
                {/* Workers Section */}
                <Nav.Item>
                  <Nav.Link 
                    className="d-flex align-items-center" 
                    onClick={toggleWorkers}
                    href="#"
                  ><FaUser className="sidebar-icon" /> Workers
                    {openWorkers ? <FaChevronUp /> : <FaChevronDown />}
                  </Nav.Link>
                  {openWorkers && (
                    <Nav className="flex-column submenu">
                      <Nav.Item>
                        <Nav.Link href="/see-worker">
                          <FaRegEye className="sidebar-icon" /> See Workers
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link href="/add-worker">
                          <FaUserPlus className="sidebar-icon" /> Add Workers
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  )}
                </Nav.Item>

                {/* Permission Section */}
                <Nav.Item>
                  <Nav.Link 
                    className="d-flex align-items-center" 
                    onClick={togglePermissions}
                    href="#"
                  >
                    <FaUserCog className="sidebar-icon" /> 
                    Permissions
                    {openPermissions ? <FaChevronUp /> : <FaChevronDown />}
                  </Nav.Link>
                  {openPermissions && (
                    <Nav className="flex-column submenu">
                      <Nav.Item>
                        <Nav.Link href="/see-permissions">
                          <FaRegEye className="sidebar-icon" /> See Permissions
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link href="#">
                          <FaRegEdit className="sidebar-icon" /> Add Permissions
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  )}
                </Nav.Item>

                {/* Logs Section */}
                <Nav.Item>
                  <Nav.Link 
                    className="d-flex align-items-center" 
                    onClick={toggleLogs}
                    href="#"
                  >
                    <FaClipboardList className="sidebar-icon" /> Logs
                    {openLogs ? <FaChevronUp /> : <FaChevronDown />}
                  </Nav.Link>
                  {openLogs && (
                    <Nav className="flex-column submenu">
                      <Nav.Item>
                        <Nav.Link href="#">
                          <FaRegEye className="sidebar-icon" /> Error Logs
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link href="#">
                          <FaRegEye className="sidebar-icon" /> Worker Logs
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link href="#">
                          <FaRegEye className="sidebar-icon" /> Sensor Logs
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  )}
                </Nav.Item>
              </Nav>
            )}
          </Nav.Item>
        )}

        {/* Patients Section */}
        {workerRole && (
          <Nav.Item>
            <Nav.Link 
              className="d-flex align-items-center" 
              onClick={togglePatients}
              href="#"
            >
              <FaUser className="sidebar-icon" /> Patients
              {openPatients ? <FaChevronUp /> : <FaChevronDown />}
            </Nav.Link>
            {openPatients && (
              <Nav className="flex-column submenu">
                <Nav.Item>
                  <Nav.Link href="#">
                    <FaUserPlus className="sidebar-icon" /> Add Patient
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#">
                    <FaRegEdit className="sidebar-icon" /> Edit Patient
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#">
                    <FaRegEye className="sidebar-icon" /> See Patient
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            )}
          </Nav.Item>
        )}

        {/* Device Section */}
        {workerRole && (
          <Nav.Item>
            <Nav.Link 
              className="d-flex align-items-center" 
              onClick={toggleDevice}
              href="#"
            >
              <MdDevicesOther className="sidebar-icon" /> Device
              {openDevice ? <FaChevronUp /> : <FaChevronDown />}
            </Nav.Link>
            {openDevice && (
              <Nav className="flex-column submenu">
                <Nav.Item>
                  <Nav.Link href="#">
                    <FaStethoscope className="sidebar-icon" /> Add Device
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#">
                    <FaRegEdit className="sidebar-icon" /> Edit Device
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#">
                    <FaRegEye className="sidebar-icon" /> See All Devices
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            )}
          </Nav.Item>
        )}

        {/* Personal Section */}
        {workerRole && (
          <Nav.Item>
            <Nav.Link href="#">
              <FaUserFriends className="sidebar-icon" /> Personal
            </Nav.Link>
          </Nav.Item>
        )}
      </Nav>
    </div>
  );
};

export default SideBar;