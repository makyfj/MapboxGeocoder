const SEASON = "BUNNY";

interface Mall {
  id: string;
  name: string;
  longitude: number;
  latitude: number;
}

interface GeoJSON {
  features: Feature[];
  type: string;
}

interface Feature {
  type: string;
  text: string;
  place_name?: string;
  center?: number[];
  place_type?: string[];
  properties: {
    title: string;
    mallId: string;
  };
  geometry: {
    coordinates: [longitude: number, latitude: number];
    type: string;
  };
}

export const mallData: Mall[] = [
  {
    id: "1",
    name: "Bunner's",
    longitude: -122.4194155,
    latitude: 37.7749295,
  },
  {
    id: "2",
    name: "NIOO",
    longitude: -122.4194155,
    latitude: 37.7749295,
  },
  {
    id: "3",
    name: "CAAA",
    longitude: -122.4194155,
    latitude: 37.7749295,
  },
];

export const prepMallDataToGeoJSON = (malls: Mall[]): GeoJSON => {
  let features: any[] = [];
  malls.forEach((mall) => {
    const featureObject: Feature = {
      type: "Feature",
      text: mall.name,
      properties: {
        title: mall.name,
        mallId: mall.id,
      },
      geometry: {
        coordinates: [mall.longitude, mall.latitude],
        type: "Point",
      },
    };
    features.push(featureObject);
  });
  const geoJSON: GeoJSON = {
    features,
    type: "FeatureCollection",
  };
  geoJSON.features = features;
  return geoJSON;
};

export const forwardGeocoder = (query: string): Feature[] => {
  let emoji = "";
  if (SEASON === "BUNNY") {
    emoji = "🐰";
  } else {
    emoji = "🎅";
  }

  let matchingFeatures: Feature[] = [];

  const featureCollection = prepMallDataToGeoJSON(mallData);

  featureCollection.features.forEach((feature) => {
    if (feature.properties.title.toLowerCase().includes(query.toLowerCase())) {
      feature["place_name"] = `${emoji} ${feature.properties.title}`;
      feature["center"] = feature.geometry.coordinates;
      feature["place_type"] = ["mall"];
      matchingFeatures.push(feature);
    }
  });

  return matchingFeatures.slice(0, 3);
};
