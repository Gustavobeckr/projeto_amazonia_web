import L, { LatLng } from "leaflet";
import { Dispatch, SetStateAction } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

type Places = {
  id: string;
  name: string;
  slug: string;
  location: {
    latitude: number;
    longitude: number;
  };
};

type MaProps = {
  places?: Places[];
  position: LatLng | null;
  setPosition: Dispatch<SetStateAction<LatLng | null>>;
};

// var greenIcon = L.icon({
//   iconUrl: "/icons/tree-deciduous.svg",

//   iconSize: [38, 95], // size of the icon
//   shadowSize: [50, 64], // size of the shadow
//   iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
//   shadowAnchor: [4, 62], // the same for the shadow
//   popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
// });

export default function Map({ places, position, setPosition }: MaProps) {
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
      <MarkerPointMap setPosition={setPosition} />
      {position && <Marker position={[position.lat, position.lng]} />}
      {places?.map(({ id, name, location }, index) => {
        const { latitude, longitude } = location;
        return (
          <Marker key={id} position={[latitude, longitude]} title={name} />
        );
      })}
    </MapContainer>
  );
}

function MarkerPointMap({
  setPosition,
}: {
  setPosition: Dispatch<SetStateAction<LatLng | null>>;
}) {
  const map = useMapEvents({
    click: (e) => {
      setPosition(e.latlng);
    },
  });

  return null;
}
