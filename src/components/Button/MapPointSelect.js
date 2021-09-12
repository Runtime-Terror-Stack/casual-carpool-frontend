import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
// import markerimg from "../../image/marker.png";

const MapPointSelect = () => {
  mapboxgl.workerClass = MapboxWorker;
  mapboxgl.accessToken =
    "pk.eyJ1Ijoic2h1dnJvOTciLCJhIjoiY2pubjJ4bzA1MjI4bTNxb2pwcmV4OXE4byJ9.4XJJfg7_arK7gXzDMXEpBQ";
  const mapContainer = useRef(null);
  // const markRef = useRef(null);
  // eslint-disable-next-line
  const [lng, setLng] = useState(88); // longitude of map center
  // eslint-disable-next-line
  const [lat, setLat] = useState(22); // latitude of map center
  // eslint-disable-next-line
  const [zoom, setZoom] = useState(18); // map zoom level
  // eslint-disable-next-line
  const [center, setCenter] = useState([0, 0]);
  // const [func,setFunc] = useState(() => () => null)// function to center the map on button click
  const [map, setMap] = useState();
  // useEffect(()=>{
  //   navigator.geolocation.getCurrentPosition((pos)=>{setLng(pos.coords.longitude);setLat(pos.coords.latitude)})
  // })

  const start = [88.45090000001005, 22.696444526204303];
  // create a function to make a directions request
  async function getRoute(end) {
    // make a directions request using cycling profile
    // an arbitrary start will always be the same
    // only the end or destination will change
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
      { method: "GET" }
    );
    const json = await query.json();
    const data = json.routes[0];
    const route = data.geometry.coordinates;
    const geojson = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: route,
      },
    };
    // if the route already exists on the map, we'll reset it using setData
    if (map.getSource("route")) {
      map.getSource("route").setData(geojson);
    }
    // otherwise, we'll make a new request
    else {
      map.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: geojson,
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#3887be",
          "line-width": 5,
          "line-opacity": 0.75,
        },
      });
    }
    // add turn instructions here at the end
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCenter([pos.coords.longitude, pos.coords.latitude]);
        setLng(pos.coords.longitude);
        setLat(pos.coords.latitude);
      },
      () => {
        console.log("error");
      }
    );
    return () => {
      if (map) map.remove();
    };
  }, []);
  useEffect(() => {
    setMap(
      new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/shuvro97/ckn27edc22thl17ms9epngrtx",
        center: center,
        zoom: zoom,
        maxZoom: 19,
      })
    );
  }, [center]);
  useEffect(() => {
    // let geolocate;
    // let marker;
    if (map) {
      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          // enableHighAccuracy: true
        },
        // trackUserLocation: true
      });
      map.addControl(geolocate);

      map.on("load", function () {
        geolocate.trigger();
        // make an initial directions request that
        // starts and ends at the same location
        getRoute(start);

        // Add starting point to the map
        map.addLayer({
          id: "point",
          type: "circle",
          source: {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "Point",
                    coordinates: start,
                  },
                },
              ],
            },
          },
          paint: {
            "circle-radius": 10,
            "circle-color": "#3887be",
          },
        });
      });

      const marker = new mapboxgl.Marker() // markRef.current
        .setLngLat(center)
        .addTo(map);
      const marker2 = new mapboxgl.Marker({ color: "red" }).setLngLat(center);
      map.on("click", ({ lngLat }) => {
        const coords = Object.keys(lngLat).map((key) => lngLat[key]);
        const end = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: coords,
              },
            },
          ],
        };
        if (map.getLayer("end")) {
          map.getSource("end").setData(end);
        } else {
          map.addLayer({
            id: "end",
            type: "circle",
            source: {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: [
                  {
                    type: "Feature",
                    properties: {},
                    geometry: {
                      type: "Point",
                      coordinates: coords,
                    },
                  },
                ],
              },
            },
            paint: {
              "circle-radius": 10,
              "circle-color": "#f30",
            },
          });
        }
        getRoute(coords);
      });

      map.on("move", (e) => {
        if (e.originalEvent === undefined || e.originalEvent.type !== "wheel") {
          setLng(map.getCenter().lng);
          setLat(map.getCenter().lat);
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              marker2.setLngLat([pos.coords.longitude, pos.coords.latitude]);
            },
            () => {
              console.log("error");
            }
          );
          if (
            e.originalEvent !== undefined ||
            marker.getLngLat().lng !== marker2.getLngLat().lng ||
            marker.getLngLat().lat !== marker2.getLngLat().lat
          )
            marker.setLngLat(map.getCenter());
        } else if (e.originalEvent.type === "wheel") {
          setLng(marker.getLngLat().lng);
          setLat(marker.getLngLat().lat);
          map.setCenter([marker.getLngLat().lng, marker.getLngLat().lat]);
        }
      });

      // map.on('click',(e)=>{
      //   console.log(e.lngLat.lng,e.lngLat.lat)
      //   setLng(e.lngLat.lng);
      //   setLat(e.lngLat.lat);
      //   // marker.setLngLat(map.getCenter());
      //   map.setCenter([e.lngLat.lng,e.lngLat.lat])
      // })

      return () => {
        if (map) {
          map.removeControl(geolocate);
          marker.remove();
        }
      };
    }
  }, [map]);

  return (
    <div className="map-test">
      <div className="sidebar">
        Longitude: {lng.toFixed(4)} | Latitude: {lat.toFixed(4)} | Zoom: {zoom}
      </div>
      {/* run npm install -g http-server. Next go to common/image in cmd and run http-server ./ 
            replace below url with the one you get */}
      <div className="map-container" ref={mapContainer} />
      {/* <img src={markerimg} id="marker" ref={markRef} /> */}
    </div>
  );
};
export default MapPointSelect;
