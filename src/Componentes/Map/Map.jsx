import React from "react";
import { MapContainer, TileLayer, useMap, Marker,Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { customIcon } from "./Icon"
import LocationMarker from "./locationMarker";

export default function Map(props) {


    return (
        <MapContainer style={{ height: '300px', width: '500px', }} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
            <TileLayer 
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url={props.image}
            />
           <LocationMarker></LocationMarker>
        </MapContainer>
    )
}