import type { NextPage } from "next";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useEffect, useState } from "react";
import {
  prepMallDataToGeoJSON,
  forwardGeocoder,
  mallData,
} from "../customData";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MB_TOKEN as string;

const Home: NextPage = () => {
  const [result, setResult] = useState(null);
  const [query, setQuery] = useState("");

  const localGeocoder = forwardGeocoder(query);
  console.log(localGeocoder);

  useEffect(() => {
    const geocoder = new MapboxGeocoder({
      accessToken: MAPBOX_TOKEN,
      types: "country,region,district,place,postcode",
    });
    geocoder.addTo("#geocoder");
    // Display the geocoder result

    // Add localGeocoder to geocoder

    geocoder.on("result", function (ev) {
      if (ev) {
        setResult(ev.result);
      }
    });
    return () => {
      geocoder.onRemove();
    };
  }, []);

  return (
    <div>
      <div id="geocoder"></div>
      <div id="search"></div>
      <h1>Hello Next.js</h1>
    </div>
  );
};

export default Home;
