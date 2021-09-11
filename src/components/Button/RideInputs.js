import React from "react";
// import MyMap from "./components/Button/Map2";

const RideInputs = () => {
    const [source,setSource] = useState();
    // geocodingClient.forwardGeocode({
    //     query: 'Paris, France',
    //     limit: 2
    //   })
    //     .send()
    //     .then(response => {
    //       const match = response.body;
    //     });
    return(
        <>
        <input type='text' placeholder='Enter source location' 
        onChange={(e)=>{
            setSource(e.target.value)
            geocodingClient.forwardGeocode({
                query: e.target.value,
                limit: 2
            })
            .send()
            .then(response => {
            const match = response.body;
            console.log(match)
            });
            }}></input>
        </>
    )
}
export default RideInputs;