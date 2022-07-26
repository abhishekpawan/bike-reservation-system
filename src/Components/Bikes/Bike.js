import React, { useState, useEffect, useContext } from "react";
import { bikeData } from "../../App";
import { FaTimes } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Bike = (props) => {
  const [isSpinning, setSpinning] = useState(false);
  const { user, bikeList, setBikeList, popupMsg, notificationPopup } =
    useContext(bikeData);

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: "#ff4400" }} spin />
  );

  const URL = `http://localhost:5000/bookedBikes/${props.bikeDetails._id}`;

  const bookBike = () => {
    setSpinning(true);
    const BookBikes = async () => {
      await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const updatedBikeList = bikeList.filter((bike) => {
            return bike._id !== props.bikeDetails._id;
          });
          setBikeList(updatedBikeList);
          setSpinning(false);

          popupMsg.current = "Bike Booked SuccesFully!";
          notificationPopup("success");
        });
    };

    BookBikes();
  };

  return (
    <Spin indicator={antIcon} spinning={isSpinning}>
      <div className="bike-item row">
        <div className="col-6 col-lg-8 bike-title">
          <span>{props.bikeDetails.model}</span>
          <span className="date">
            {props.bikeDetails.color} {props.bikeDetails.location}
          </span>
        </div>
        <div className="col-6 col-lg-4">
          <div className="row">
            <div className="col-12 col-sm-6 bike-amount">
              Avg. Rating: {props.bikeDetails.avgRating}
            </div>
            <div className="col-12 col-sm-6 bike-actions">
              <div className="edit" type="button" onClick={bookBike}>
                <i className="edit-icon">Book Bike</i>
              </div>

              {/* <div className="delete">
                    <i className="del-icon" 
                    // onClick={deleteHandler}
                    >
                      <FaTimes />
                    </i>
                  </div> */}
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Bike;
