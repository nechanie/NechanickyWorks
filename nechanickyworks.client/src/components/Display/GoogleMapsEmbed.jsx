import React, { useEffect, useState } from 'react';
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
    const [apiKey, setApiKey] = useState(null);

    useEffect(() => {
        fetch('/GoogleMaps/config') // Ensure this matches your backend route exactly
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                setApiKey(data.apiKey);
            })
            .catch(error => console.error('Error fetching API key:', error));
    }, []);

    return (
        <LoadScript
            googleMapsApiKey={apiKey || import.meta.env.VITE_GOOGLE_MAPS_API_KEY } 
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
