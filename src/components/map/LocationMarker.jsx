import React from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import Button from '../button';

const MARKER_ICON_MAPPINGS = {
  blue: 'https://www.google.com/maps/vt/icon/name=assets/icons/spotlight/spotlight_pin_v2_shadow-1-small.png,assets/icons/spotlight/spotlight_pin_v2-1-small.png,assets/icons/spotlight/spotlight_pin_v2_dot-1-small.png,assets/icons/spotlight/spotlight_pin_v2_accent-1-small.png&highlight=000000,1400FF,FFFFFF,000000&color=1400FF?scale=1',
  gray: 'https://www.google.com/maps/vt/icon/name=assets/icons/spotlight/spotlight_pin_v2_shadow-1-small.png,assets/icons/spotlight/spotlight_pin_v2-1-small.png,assets/icons/spotlight/spotlight_pin_v2_dot-1-small.png,assets/icons/spotlight/spotlight_pin_v2_accent-1-small.png&highlight=000000,C0C0C0,FFFFFF,000000&color=C0C0C0?scale=1',
};

function LocationMarker(props) {
  const {
    id,
    mapLocation,
    isOpen,
    onClick,
    onClose,
    onSubmit,
    children,
    color = 'blue',
  } = props;
  const position = {
    lng: mapLocation.position.coordinates[0],
    lat: mapLocation.position.coordinates[1],
  };

  return (
    <Marker key={id} position={position} onClick={onClick} icon={{ url: MARKER_ICON_MAPPINGS[color] }}>
      {isOpen && (
        <InfoWindow
          options={{
            maxWidth: window.innerWidth - 100,
          }}
          onCloseClick={onClose}
        >
          <div
            style={{
              textAlign: 'left',
              maxHeight: window.innerHeight - 200,
              overflowY: 'auto',
            }}
          >
            {children}
            <br />
            <Button primary fluid onClick={onSubmit}>
              <span>YES</span>
            </Button>
            <div style={{ margin: '.5em' }} />
            <Button primary basic fluid onClick={onClose}>
              <span>NO THANKS</span>
            </Button>
          </div>
        </InfoWindow>
      )}
    </Marker>
  );
}

export default LocationMarker;
