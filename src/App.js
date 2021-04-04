import React from "react";
import Button from "./components/Button/Button";
import MyMap from "./components/Button/Map";
import TestService from "./services/TestService";

function App() {
  return (
    <div id="test">
      <div className="App">
      <h1>Casual Carpool</h1>
      <Button name="Get All" clickHandler={TestService.getAll} />
      <Button name="Get By Id" clickHandler={TestService.getById} />
      <Button name="Add Value" clickHandler={TestService.addValue} />
      <Button name="Update Value" clickHandler={TestService.updateValue} />
      <Button name="Delete Value" clickHandler={TestService.deleteValue} />
    </div>
    <MyMap />
    </div>
  );
}

export default App;
