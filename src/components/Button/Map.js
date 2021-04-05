import React, { useRef,useEffect, useState } from "react";
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
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

const MyMap = ()=>{
    mapboxgl.workerClass = MapboxWorker;
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2h1dnJvOTciLCJhIjoiY2pubjJ4bzA1MjI4bTNxb2pwcmV4OXE4byJ9.4XJJfg7_arK7gXzDMXEpBQ';
    const mapContainer = useRef(null);
    const [lng, setLng] = useState(78.9629);
    const [lat, setLat] = useState(20.5937);
    const [zoom, setZoom] = useState(3.5);
    useEffect(() => {
        const map = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/shuvro97/ckn27edc22thl17ms9epngrtx",
          center: [lng, lat],
          zoom: zoom,
        });
        map.on('move', () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
            });
        return () => map.remove();
      }, []);
      
    // useEffect(()=>{
        
    // })
    return(
        <div className="map-test">
            <div className="sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            {/* run npm install -g http-server. Next go to common/image in cmd and run http-server ./ 
            replace below url with the one you get */}
            <div className="map-container" ref={mapContainer} />
            <img src="http://192.168.1.4:8080/marker.png" id="marker"/>
        </div>
    )
}
export default MyMap;