import React from "react";
import { useState } from 'react';
import { Marker, Popup, useMapEvents, Tooltip } from 'react-leaflet'
import { customIcon } from "./Icon"
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import getAllMediaFields from "../Plan/getAllMediaFields";
import getAllMediaFieldsSons from "../Plan/getAllMediaFieldsSons";

export default function ViewMediaLocationMarker(props) {



  const Medias = async (description) => {
    console.log(description)

    let data = await getAllMediaFields(description, "", "")
    props.setMedias(data)
    let media_sons = await getAllMediaFieldsSons(description, "", "")
    props.setMediaSons(media_sons)

   


  }


  return (
    <Marker position={props.mediaData.coordinadas || null} icon={customIcon}>
      <Tooltip direction="top" offset={[-15, -28]} >
        {props.mediaData.description}
      </Tooltip>

      <Popup>
        <Container>

          <Row>
            <img src={"http://127.0.0.1:8000" + props.mediaData.category.image} alt="" />
          </Row>
          <Row className="mt-3">
            <div style={{ maxHeight: "100px", overflowY: "scroll" }}>
              <h6>Categoría: {props.mediaData.category.description}</h6>
              <h6 >Descripción: {props.mediaData.description}</h6>
              {props.mediaData.media_fields.map((media_field) =>
                <h6>
                  {media_field.field.name}:
                  {media_field.field.link != "" ?
                    <a
                      onClick={() => props.getMediasLink(props.mediaData.description, media_field.field.link)}
                      href="#">{media_field.field.value}
                    </a>
                    : media_field.field.value
                  }
                </h6>
              )}
              {props.mediaData.father_containers.length != 0 &&
                <h6>Dentro de :
                  <a
                    onClick={() => Medias(props.mediaData.father_containers[0].father.description)}
                    href="#">{props.mediaData.father_containers[0].father.description}
                  </a>
                </h6>
              }
              {props.mediaSons.length != 0 && props.mediaSons[0].son_containers.map((son) =>
                <h6>Contiene a :
                  <a onClick={() => Medias(son.son.description)}
                    href="#"
                    >
                    {son.son.description}
                  </a>
                </h6>
              )}
            </div>
          </Row>
        </Container>
      </Popup>
    </Marker>
  )
}