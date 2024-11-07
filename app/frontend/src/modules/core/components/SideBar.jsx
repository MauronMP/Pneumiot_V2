import React, { useState } from 'react'; // Importing React and useState hook
import { Nav } from 'react-bootstrap'; // Importing the Nav component from react-bootstrap for navigation
import {
  FaUserCog, FaUserPlus, FaUser, FaRegEdit,
  FaRegEye, FaUserFriends, FaChevronDown,
  FaChevronUp, FaClipboardList, FaMicrochip
} from 'react-icons/fa'; // Importing various icons for the sidebar links
import { MdDevicesOther } from 'react-icons/md'; // Importing a device icon
import { useTranslation } from 'react-i18next'; // Import useTranslation hook for translations
import '../design-system/components/SideBar.scss'; // Importing custom SCSS for styling

const SideBar = ({ isOpen }) => {
  const { t } = useTranslation('sidebar'); // Se especifica el namespace 'sidebar'

  // Managing the state for the toggling of various sections in the sidebar
  const [openPatients, setOpenPatients] = useState(false);
  const [openDevice, setOpenDevice] = useState(false);
  const [openAdminPanel, setOpenAdminPanel] = useState(false);
  const [openWorkers, setOpenWorkers] = useState(false);
  const [openPermissions, setOpenPermissions] = useState(false);
  const [openLogs, setOpenLogs] = useState(false);
  const [openSensors, setOpenSensors] = useState(false); // Added state for Sensors section

  // Toggle functions for expanding/collapsing sections
  const togglePatients = () => setOpenPatients(!openPatients);
  const toggleDevice = () => setOpenDevice(!openDevice);
  const toggleAdminPanel = () => setOpenAdminPanel(!openAdminPanel);
  const toggleWorkers = () => setOpenWorkers(!openWorkers);
  const togglePermissions = () => setOpenPermissions(!openPermissions);
  const toggleLogs = () => setOpenLogs(!openLogs);
  const toggleSensors = () => setOpenSensors(!openSensors); // Added toggle for Sensors

  // Retrieving user data from sessionStorage to display user information and role-based navigation
  const loginData = sessionStorage.getItem('loginData');
  const user = loginData ? JSON.parse(loginData) : null;
  const workerName = user?.workerDetails?.worker_name;
  const workerSurname = user?.workerDetails?.worker_surname;
  const workerRole = user?.workerDetails?.worker_role_name;

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}> {/* Sidebar toggle based on 'isOpen' prop */}
      <Nav className="flex-column">
        {/* Display user info if available */}
        {user && (
          <Nav.Item className="sidebar-user-info">
            <Nav.Link href="#">
              <div className="user-info">
                <span className="user-greeting">{t('hello')},</span>
                <span className="user-name">{workerName} {workerSurname}</span>
              </div>
            </Nav.Link>
          </Nav.Item>
        )}

        {/* Admin Panel Section (Only visible if role is admin) */}
        {(workerRole === 'admin') && (
          <Nav.Item>
            <Nav.Link
              className="d-flex align-items-center"
              onClick={toggleAdminPanel}
              href="#"
            >
              <FaUserCog className="sidebar-icon" /> {t('adminPanel')}
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
                  >
                    <FaUser className="sidebar-icon" /> {t('workers')}
                    {openWorkers ? <FaChevronUp /> : <FaChevronDown />}
                  </Nav.Link>
                  {openWorkers && (
                    <Nav className="flex-column submenu">
                      <Nav.Item>
                        <Nav.Link href="/see-worker">
                          <FaRegEye className="sidebar-icon" /> {t('seeWorkers')}
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link href="/add-worker">
                          <FaUserPlus className="sidebar-icon" /> {t('addWorkers')}
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  )}
                </Nav.Item>

                {/* Permissions Section */}
                <Nav.Item>
                  <Nav.Link
                    className="d-flex align-items-center"
                    onClick={togglePermissions}
                    href="#"
                  >
                    <FaUserCog className="sidebar-icon" />
                    {t('permissions')}
                    {openPermissions ? <FaChevronUp /> : <FaChevronDown />}
                  </Nav.Link>
                  {openPermissions && (
                    <Nav className="flex-column submenu">
                      <Nav.Item>
                        <Nav.Link href="/see-permissions">
                          <FaRegEye className="sidebar-icon" /> {t('seePermissions')}
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link href="/create-permissions">
                          <FaRegEdit className="sidebar-icon" /> {t('createPermissions')}
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
                    href="/logs"
                  >
                    <FaClipboardList className="sidebar-icon" /> {t('logs')}
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            )}
          </Nav.Item>
        )}

        {/* Patients Section (Visible for all roles) */}
        {workerRole && (
          <Nav.Item>
            <Nav.Link
              className="d-flex align-items-center"
              onClick={togglePatients}
              href="#"
            >
              <FaUser className="sidebar-icon" /> {t('patients')}
              {openPatients ? <FaChevronUp /> : <FaChevronDown />}
            </Nav.Link>
            {openPatients && (
              <Nav className="flex-column submenu">
                {workerRole === 'admin' && (
                  <Nav.Item>
                    <Nav.Link href="/add-patient">
                      <FaUserPlus className="sidebar-icon" /> {t('addPatient')}
                    </Nav.Link>
                  </Nav.Item>
                )}
                <Nav.Item>
                  <Nav.Link href="/patients">
                    <FaRegEye className="sidebar-icon" /> {t('seePatient')}
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            )}
          </Nav.Item>
        )}

        {/* Device Section (Visible for all roles) */}
        {workerRole && (
          <Nav.Item>
            <Nav.Link
              className="d-flex align-items-center"
              onClick={toggleDevice}
              href="board-with-sensors"
            >
              <MdDevicesOther className="sidebar-icon" /> {t('devices')}
            </Nav.Link>
          </Nav.Item>
        )}

        {/* Sensors Section (Visible for all roles) */}
        {workerRole && (
          <Nav.Item>
            <Nav.Link
              className="d-flex align-items-center"
              onClick={toggleSensors}
              href="#"
            >
              <FaMicrochip className="sidebar-icon" /> {t('sensors')}
              {openSensors ? <FaChevronUp /> : <FaChevronDown />}
            </Nav.Link>
            {openSensors && (
              <Nav className="flex-column submenu">
                {workerRole === 'admin' && (
                  <Nav.Item>
                    <Nav.Link href="/add-sensors">
                      <FaRegEdit className="sidebar-icon" /> {t('addSensor')}
                    </Nav.Link>
                  </Nav.Item>
                )}
                <Nav.Item>
                  <Nav.Link href="/sensors">
                    <FaRegEye className="sidebar-icon" /> {t('seeSensors')}
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            )}
          </Nav.Item>
        )}

        {/* Personal Section (Visible for all roles) */}
        {workerRole && (
          <Nav.Item>
            <Nav.Link href="/profile">
              <FaUserFriends className="sidebar-icon" /> {t('profile')}
            </Nav.Link>
          </Nav.Item>
        )}
      </Nav>
    </div>
  );
};

export default SideBar; // Exporting the Sidebar component