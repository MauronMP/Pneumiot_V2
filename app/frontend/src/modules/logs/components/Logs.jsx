import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, InputGroup, Form } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next'; // Import useTranslation for translations
import config from '../../../config/config';  // Import URL paths for APIs

const Logs = () => {
  const { t } = useTranslation('logs'); // Use the translation hook

  const [Logs, setLogs] = useState([]); // Initially set to an empty array
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(20);
  const [totalLogs, setTotalLogs] = useState(0);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch error logs from the server with pagination
  useEffect(() => {
    fetchLogs(); // Fetch logs whenever currentPage changes
  }, [currentPage]);

  // Fetch logs from the server
  const fetchLogs = async () => {
    try {
      const response = await axios.get(`${config.frontendBaseUrl}logs`, {
        params: {
          page: currentPage,  // Current page number for pagination
        },
      });

      setLogs(response.data);  // Set the fetched logs into the state
      setTotalLogs(response.headers['x-total-count'] || 0);  // Set total log count from headers
    } catch (err) {
      console.error('Error fetching error logs', err);  // Log any errors
      setLogs([]); // Reset logs to empty if there's an error
    }
  };

  // Function to open the modal and display the details of a selected log
  const handleShowDetail = (log) => {
    setSelectedLog(log);  // Set the selected log details
    setShowDetailModal(true);  // Show the modal
  };

  // Function to close the modal and reset selected log
  const handleCloseDetail = () => {
    setShowDetailModal(false);  // Close the modal
    setSelectedLog(null);  // Reset the selected log
  };

  // Handle search input changes and reset to the first page
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);  // Update search term based on input value
    setCurrentPage(1);  // Reset pagination to the first page
  };

  // Handle page changes (when the user clicks on a page number)
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);  // Update current page to the selected page number
  };

  // Apply search filter to logs based on log_message
  const filteredLogs = Logs.filter(log =>
    log.log_message.toLowerCase().includes(searchTerm.toLowerCase())  // Filter logs where log_message includes the searchTerm
  );

  // Calculate total number of pages for pagination
  const totalPages = Math.ceil(totalLogs / logsPerPage);

  return (
    <div className="container mt-4">
      <h2>{t('error_logs')}</h2>
      
      {/* Search input field for filtering logs */}
      <InputGroup className="mb-3">
        <Form.Control
          placeholder={t('search_logs')}  // Use translation for placeholder
          value={searchTerm}  // Bind input value to the searchTerm state
          onChange={handleSearch}  // Trigger handleSearch when input changes
        />
      </InputGroup>

      {/* Table displaying filtered error logs */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{t('log_id')}</th>
            <th>{t('message')}</th>
            <th>{t('actions')}</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.length > 0 ? (
            // If filtered logs exist, map through them and display each log
            filteredLogs.map(log => (
              <tr key={log.log_id}>
                <td>{log.log_id}</td>
                <td>{log.log_message}</td>
                <td>
                  {/* Button to open modal and view details of a log */}
                  <Button className='w-100' variant="info" onClick={() => handleShowDetail(log)}>
                    {t('view_details')}
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            // If no logs are found, display a message in the table
            <tr>
              <td colSpan="3" className="text-center">{t('no_logs_found')}</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Pagination buttons */}
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          // Generate a button for each page
          <Button
            key={index}
            onClick={() => handlePageChange(index + 1)}  // Call handlePageChange with page number
            disabled={currentPage === index + 1}  // Disable button if it's the current page
          >
            {index + 1}
          </Button>
        ))}
      </div>

      {/* Modal to display selected log details */}
      <Modal show={showDetailModal} onHide={handleCloseDetail}>
        <Modal.Header closeButton>
          <Modal.Title>{t('log_details')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Display the log message of the selected log */}
          {selectedLog && <p>{selectedLog.log_message}</p>}
        </Modal.Body>
        <Modal.Footer>
          {/* Button to close the modal */}
          <Button variant="secondary" onClick={handleCloseDetail}>
            {t('close')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Logs;