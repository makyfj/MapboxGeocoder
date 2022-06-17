import type { NextPage } from "next";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useEffect, useState } from "react";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MB_TOKEN as string;

const Home: NextPage = () => {
  const [result, setResult] = useState(null);
  useEffect(() => {
    const geocoder = new MapboxGeocoder({
      accessToken: MAPBOX_TOKEN,

      types: "country,region,district,place,postcode",
    });
    geocoder.addTo("#geocoder");
    // Display the geocoder result
    geocoder.on("result", function (ev) {
      if (ev) {
        setResult(ev.result);
      }
    });
    return () => {
      geocoder.onRemove();
    };
  }, []);

  console.log(result);

  return (
    <div>
      <div id="geocoder"></div>
      <h1>Hello Next.js</h1>
    </div>
  );
};

export default Home;
