import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { 
  FaUserCog, FaUserPlus, FaUser, 
  FaTachometerAlt, FaStethoscope, FaRegEdit, 
  FaRegEye, FaUserFriends, FaChevronDown, 
  FaChevronUp 
} from 'react-icons/fa';
import { MdDevicesOther } from 'react-icons/md';
import '../design-system/components/SideBar.scss';

const SideBar = ({ isOpen }) => {
  const [openPatients, setOpenPatients] = useState(false);
  const [openDevice, setOpenDevice] = useState(false);
  const [openDashboard, setOpenDashboard] = useState(false);

  const togglePatients = () => setOpenPatients(!openPatients);
  const toggleDevice = () => setOpenDevice(!openDevice);
  const toggleDashboard = () => setOpenDashboard(!openDashboard);

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <Nav className="flex-column">
        <Nav.Item>
          <Nav.Link href="#">
            <FaUserCog className="sidebar-icon" /> Admin Panel
          </Nav.Link>
        </Nav.Item>

        {/* Patients Section */}
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
              <Nav.Item>
                <Nav.Link 
                  className="d-flex align-items-center" 
                  onClick={toggleDashboard}
                  href="#"
                >
                  <FaTachometerAlt className="sidebar-icon" /> Dashboard
                  {openDashboard ? <FaChevronUp /> : <FaChevronDown />}
                </Nav.Link>
                {openDashboard && (
                  <Nav className="flex-column submenu">
                    <Nav.Item>
                      <Nav.Link href="#">a</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link href="#">b</Nav.Link>
                    </Nav.Item>
                  </Nav>
                )}
              </Nav.Item>
            </Nav>
          )}
        </Nav.Item>

        {/* Device Section */}
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

        {/* Personal Section */}
        <Nav.Item>
          <Nav.Link href="#">
            <FaUserFriends className="sidebar-icon" /> Personal
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default SideBar;
