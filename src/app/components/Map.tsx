import { LatLng, map } from "leaflet";
import { MapPin } from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Circle,
  MapContainer,
  Marker,
  Popup,
  SVGOverlay,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

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
};

export default function Map({ places }: MaProps) {
  const [position, setPosition] = useState<LatLng | null>(null);
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
      <Marker position={[-3.4001527, -62.3965349]} />
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
  position?: LatLng | null;
  setPosition: Dispatch<SetStateAction<LatLng | null>>;
}) {
  const map = useMapEvents({
    click: () => {
      map.locate();
    },
    locationfound: (location) => {
      setPosition(location.latlng);
      console.log("location found:", location);
    },
  });

  return null;
}
