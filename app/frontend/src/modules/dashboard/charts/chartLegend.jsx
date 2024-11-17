import React from 'react';
import { Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const RiskLevelLegend = () => {
  const { t } = useTranslation('chartLegend'); // Get the translation function

  // Define colors and labels for standard environmental measurements
  const indexRateLegend = [
    { color: '#93CE07', label: t('legend.optimal_condition'), description: t('tooltip.optimal_condition') },  // Green
    { color: '#FBDB0F', label: t('legend.acceptable_condition'), description: t('tooltip.acceptable_condition') }, // Yellow
    { color: '#FD0100', label: t('legend.critical_condition'), description: t('tooltip.critical_condition') },  // Red
  ];

  return (
    <Row className="justify-content-center mt-4">
      {indexRateLegend.map((item, index) => (
        <Col key={index} xs="auto" className="d-flex align-items-center mb-2">
          {/* Tooltip appears when hovering over the color circle */}
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>{item.description}</Tooltip>} // Tooltip with the description of the color
          >
            <div
              style={{
                width: '20px',  // Size of the color circle
                height: '20px',
                backgroundColor: item.color,  // Circle color based on the index
                borderRadius: '50%',  // Make the div a circle
                marginRight: '10px',
                cursor: 'pointer', // Change cursor to pointer for interactivity
              }}
            ></div>
          </OverlayTrigger>
          <div>
            <span>{item.label}</span>  {/* Display the label for the color */}
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default RiskLevelLegend;