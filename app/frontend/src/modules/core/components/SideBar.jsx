import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { 
  FaUserCog, FaUserPlus, FaUser, 
  FaTachometerAlt, FaStethoscope, FaRegEdit, 
  FaRegEye, FaUserFriends, FaChevronDown, 
  FaChevronUp 
} from 'react-icons/fa';
import { MdDevicesOther } from 'react-icons/md';

const SideBar = ({ isOpen }) => {
  const [openPatients, setOpenPatients] = useState(false);
  const [openDevice, setOpenDevice] = useState(false);
  const [openDashboard, setOpenDashboard] = useState(false);

  const togglePatients = () => setOpenPatients(!openPatients);
  const toggleDevice = () => setOpenDevice(!openDevice);
  const toggleDashboard = () => setOpenDashboard(!openDashboard);

  const submenuStyle = {
    marginLeft: '20px', // Desplazamiento hacia la derecha para los submenús
  };

  return (
    <div
      style={{
        width: isOpen ? '250px' : '0',
        transition: 'width 0.3s',
        overflowX: 'hidden',
        backgroundColor: '#343a40',
        height: '100vh',
        color: 'white'
      }}
    >
      <Nav className="flex-column text-white p-3">
        <Nav.Item>
          <Nav.Link className="text-white" href="#">
            <FaUserCog /> Admin Panel
          </Nav.Link>
        </Nav.Item>

        {/* Patients Section */}
        <Nav.Item>
          <Nav.Link 
            className="text-white d-flex justify-content-between align-items-center" 
            onClick={togglePatients}
            href="#"
          >
            <div><FaUser /> Patients</div>
            {openPatients ? <FaChevronUp /> : <FaChevronDown />}
          </Nav.Link>
        </Nav.Item>
        {openPatients && (
          <Nav className="flex-column" style={submenuStyle}>
            <Nav.Item>
              <Nav.Link className="text-white" href="#">
                <FaUserPlus /> Create New Patient
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="text-white" href="#">
                <FaRegEdit /> Edit Patient
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="text-white" href="#">
                <FaRegEye /> See Patient
              </Nav.Link>
            </Nav.Item>

            {/* Dashboard Subsection */}
            <Nav.Item>
              <Nav.Link 
                className="text-white d-flex justify-content-between align-items-center" 
                onClick={toggleDashboard}
                href="#"
              >
                <div><FaTachometerAlt /> Dashboard</div>
                {openDashboard ? <FaChevronUp /> : <FaChevronDown />}
              </Nav.Link>
            </Nav.Item>
            {openDashboard && (
              <Nav className="flex-column" style={submenuStyle}>
                <Nav.Item>
                  <Nav.Link className="text-white" href="#">
                    a
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="text-white" href="#">
                    b
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            )}
          </Nav>
        )}

        {/* Device Section */}
        <Nav.Item>
          <Nav.Link 
            className="text-white d-flex justify-content-between align-items-center" 
            onClick={toggleDevice}
            href="#"
          >
            <div><MdDevicesOther /> Device</div>
            {openDevice ? <FaChevronUp /> : <FaChevronDown />}
          </Nav.Link>
        </Nav.Item>
        {openDevice && (
          <Nav className="flex-column" style={submenuStyle}>
            <Nav.Item>
              <Nav.Link className="text-white" href="#">
                <FaStethoscope /> Add Device
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="text-white" href="#">
                <FaRegEdit /> Edit Device
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="text-white" href="#">
                <FaRegEye /> See All Devices
              </Nav.Link>
            </Nav.Item>
          </Nav>
        )}

        {/* Personal Section */}
        <Nav.Item>
          <Nav.Link className="text-white" href="#">
            <FaUserFriends /> Personal
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default SideBar;
