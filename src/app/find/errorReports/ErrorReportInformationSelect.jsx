import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../../components/header';
import Button from '../../../components/button';
import Checkbox from '../../../components/checkbox';

const ErrorReportInformationSelect = (props) => {
  const {
    locationData,
    errorReportServices,
    generalLocationError,
    onGeneralLocationChange,
    onServiceChange,
    goToViewLocation,
    onSubmit,
  } = props;

  return (
    <div>
      <Header size="large" className="locationTitle">Error Report</Header>
      <div className="mx-4 mb-3 text-left">
        <div className="w-100 mr-5">
          <Header size="medium" className="mb-3">
            Which parts of the information has errors?
          </Header>
        </div>
        <div>
          <div>
            <Checkbox
              key="generalLocationError"
              name="generalLocationError"
              label="Information about the location"
              checked={generalLocationError}
              onChange={onGeneralLocationChange}
            />
          </div>
          {locationData.Services.map(service => (
            <div key={service.id}>
              <Checkbox
                key={service.id}
                name={service.id}
                label={service.name}
                checked={errorReportServices.includes(service.id)}
                onChange={() => onServiceChange(service.id)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mx-4 mb-1">
        <Button
          primary
          fluid
          onClick={onSubmit}
        >
          {
            (!generalLocationError && !errorReportServices.length)
              ? 'Skip'
              : 'Next'
          }
        </Button>
      </div>
      <div className="mx-4">
        <Button
          secondary
          fluid
          onClick={goToViewLocation}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

ErrorReportInformationSelect.propTypes = {
  locationData: PropTypes.shape({
    Services: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })),
  }).isRequired,
  errorReportServices: PropTypes.arrayOf(PropTypes.string),
  generalLocationError: PropTypes.bool.isRequired,
  onServiceChange: PropTypes.func.isRequired,
  onGeneralLocationChange: PropTypes.func.isRequired,
  goToViewLocation: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ErrorReportInformationSelect;
