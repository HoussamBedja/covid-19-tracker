import React from 'react'
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from "./util";

export default function Map({ countries, casesType, center, zoom }) {
  
  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }
  
  return (
    <MapContainer
      casesType={casesType}
      className="map"
      center={center}
      zoom={zoom}
      // scrollWheelZoom={false}
    >
      <ChangeView center={center} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=dbc279e1-1375-462f-8269-653b35f2db23"
      />
      {showDataOnMap(countries, casesType)}
    </MapContainer>
  )
}
