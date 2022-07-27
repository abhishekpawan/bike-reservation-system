import React, { useContext } from "react";
import { bikeData } from "../../App";
import Bike from "./Bike";

const BikeList = () => {
  const { bikeList, setBikeList } = useContext(bikeData);


  let bikes;
  if (bikeList.length > 0) {
    bikes = bikeList.map((bike) => {
      return <Bike key={bike._id} bikeDetails={bike} />;
    });
  } 
  else if (bikeList[0]?.msg) {
    bikes = <div className="bike-item no-bike">No bikes Found!</div>;
  }

  return <div>{bikes}</div>;
};

export default BikeList;
