import React from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%'
};

const center = {
    lat: 44.6365, // Latitude for Albany, OR
    lng: -123.1059 // Longitude for Albany, OR
};

function GoogleMapsEmbed() {
    return (
        <LoadScript
            googleMapsApiKey="AIzaSyBV0G_IaCHp9JKZJI6Z4bbiYnV8s6kxLeY" 
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            >
                <MarkerF
                    position={center} // Sets the position of the marker to the center
                // Optionally, you can add a label or an InfoWindow component here to show more details
                />
            </GoogleMap>
        </LoadScript>
    )
}

export default React.memo(GoogleMapsEmbed);
