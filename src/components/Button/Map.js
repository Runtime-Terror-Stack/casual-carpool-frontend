import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
// import markerimg from "../../image/marker.png";

// const MyMap = ()=> {
//     const [viewport, setViewport] = useState({
//       latitude: 20.5937,
//       longitude: 78.9629,
//       zoom: 3.5,
//       width: window.innerWidth,
//       height: 0.75*window.innerHeight,

//     });

//     return (
//       <ReactMapGL
//       mapStyle={ "mapbox://styles/shuvro97/ckn27edc22thl17ms9epngrtx"}
//         mapboxApiAccessToken = {'pk.eyJ1Ijoic2h1dnJvOTciLCJhIjoiY2pubjJ4bzA1MjI4bTNxb2pwcmV4OXE4byJ9.4XJJfg7_arK7gXzDMXEpBQ'}
//         {...viewport}
//         width="100%"
//         height="100%"
//         onViewportChange={(viewport) => setViewport(viewport)}
//       />
//     );
//   }

const MyMap = () => {
  mapboxgl.workerClass = MapboxWorker;
  mapboxgl.accessToken =
    "pk.eyJ1Ijoic2h1dnJvOTciLCJhIjoiY2pubjJ4bzA1MjI4bTNxb2pwcmV4OXE4byJ9.4XJJfg7_arK7gXzDMXEpBQ";
  const mapContainer = useRef(null);
  // const markRef = useRef(null);
  const [lng, setLng] = useState(88.45090000001005);// longitude of map center
  const [lat, setLat] = useState(22.696444526204303);// latitude of map center
  const [zoom, setZoom] = useState(18);// map zoom level
  const [func,setFunc] = useState(() => () => null)// function to center the map on button click

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/shuvro97/ckn27edc22thl17ms9epngrtx",
      center: [lng, lat],
      zoom: zoom,
      maxZoom: 19,
    });
    // creating the function that centers the map on button click
    setFunc(()=>()=>{
      map.flyTo({center:[88.45090000001005, 22.696444526204303],zoom:18})
    })

    // marker that always points to the center of the map. Initially points to user's current gps location
    const marker = new mapboxgl.Marker() // markRef.current
      .setLngLat([88.45090000001005, 22.696444526204303])
      .addTo(map);

    // marker that always points to user's current gps location
    // new mapboxgl.Marker().setLngLat([marker.getLngLat().lng+0.00000000006418, marker.getLngLat().lat-0.000051947384421]).addTo(map);
    const marker2 = new mapboxgl.Marker({color:"red"}).setLngLat([88.45090000001005, 22.696444526204303]).addTo(map);

    // when user moves map changing the center coordinates and making the marker point to new center
    map.on("move", (e) => {
      // console.log(e)
      if( e.originalEvent=== undefined || e.originalEvent.type !== "wheel")
      {
        setLng(map.getCenter().lng);
        setLat(map.getCenter().lat);
        setZoom(map.getZoom().toFixed(2));
        
        if(e.originalEvent !== undefined || marker.getLngLat().lng !== marker2.getLngLat().lng || marker.getLngLat().lat !== marker2.getLngLat().lat)
          marker.setLngLat(map.getCenter());
      }
      
      
    });

    // fucntion for when component unmounts
    return () => map.remove();
  }, []);

  // useEffect(()=>{

  // })
  return (
    <div className="map-test">
      <div className="sidebar">
        Longitude: {lng.toFixed(4)} | Latitude: {lat.toFixed(4)} | Zoom: {zoom}
        <button onClick={()=>{func()}}>B</button>
      </div>
      {/* run npm install -g http-server. Next go to common/image in cmd and run http-server ./ 
            replace below url with the one you get */}
      <div className="map-container" ref={mapContainer} />
      {/* <img src={markerimg} id="marker" ref={markRef} /> */}
    </div>
  );
};
export default MyMap;
