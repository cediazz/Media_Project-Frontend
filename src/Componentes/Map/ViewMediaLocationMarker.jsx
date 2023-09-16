import React from "react";
import { useState } from 'react';
import {Marker,Popup,useMapEvents,Tooltip } from 'react-leaflet'
import { customIcon } from "./Icon"
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';

export default function ViewMediaLocationMarker(props) {
   
    
    
    
     return (
      <Marker position={props.mediaData.coordinadas || null} icon={customIcon}>
        <Tooltip direction="top" offset={[0, -30]}>
        {props.mediaData.description}
        </Tooltip>
        
        <Popup>
          <Container>
            <Row>
                <img src={"http://127.0.0.1:8000"+ props.mediaData.category.image} alt="" />
            </Row>
            <Row>
            <h6>Categoría: {props.mediaData.category.description}</h6>
            <h6>Descripción: {props.mediaData.description}</h6>
            {props.mediaData.media_fields.map( (media_field) => 
            <h6>
            {media_field.field.name}: 
            {media_field.field.link != "" ? <a href={"#"+media_field.field.link}>{media_field.field.value}</a>: media_field.field.value }
            </h6> )}

            </Row>

          </Container>
         
        
        </Popup>
      </Marker>
    )
  }