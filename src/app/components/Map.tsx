import { LatLng } from "leaflet";
import { NextRouter, Router } from "next/router";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { useFieldArray, useFormContext } from "react-hook-form";

type MapProps = {
  listaLugares: { lat: string; lng: string }[] | [];
  setListaLugares: Dispatch<
    SetStateAction<{ lat: string; lng: string }[] | []>
  >;
  // router: NextRouter;
};

// var greenIcon = L.icon({
//   iconUrl: "/icons/tree-deciduous.svg",

//   iconSize: [38, 95], // size of the icon
//   shadowSize: [50, 64], // size of the shadow
//   iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
//   shadowAnchor: [4, 62], // the same for the shadow
//   popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
// });

export default function Map({ listaLugares, setListaLugares }: MapProps) {
  return (
    <MapContainer
      center={[-3.4001527, -62.3965349]}
      zoom={5}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerPointMap
        listaLugares={listaLugares!}
        setListaLugares={setListaLugares}
      />
      {listaLugares &&
        listaLugares?.map(({ lat, lng }, key) => {
          return (
            <Marker key={key} position={[parseFloat(lat), parseFloat(lng)]} />
          );
        })}
    </MapContainer>
  );
}

function MarkerPointMap({
  listaLugares,
  setListaLugares,
}: {
  listaLugares: { lat: string; lng: string }[];
  setListaLugares: Dispatch<SetStateAction<{ lat: string; lng: string }[]>>;
}) {
  const router = useRouter();
  useMapEvents({
    load: () => {},
    click: (e) => {
      listaLugares.push({
        lat: e.latlng.lat.toString(),
        lng: e.latlng.lng.toString(),
      });
      setListaLugares(listaLugares);
      router.refresh();
    },
  });

  return null;
}
