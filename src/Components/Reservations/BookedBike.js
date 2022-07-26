import React, { useContext, useState } from "react";
import { bikeData, expenseData } from "../../App";
import { FaTimes } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const BookedBike = (props) => {
  const [isSpinning, setSpinning] = useState(false);
  const { popupMsg, notificationPopup, user,bookedBikeList, setBookedBikeList } = useContext(bikeData);

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: "#ff4400" }} spin />
  );

  const URL = `http://localhost:5000/bookedBikes/${props.bikeDetails._id}`;

  const cancelBooking = () => {
    setSpinning(true);
    const CancelBikes = async () => {
      await fetch(URL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          bookingStatus: "canceled",
          isAvailable: true,
          avgRating: props.bikeDetails.avgRating,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          const updatedBookedBikeList = bookedBikeList.filter((bookedBike)=>{
            return bookedBike._id !== props.bikeDetails._id
          })
          updatedBookedBikeList.unshift(data)
          setBookedBikeList(updatedBookedBikeList)
          setSpinning(false);

          popupMsg.current = "Booking Canceled SuccesFully!";
          notificationPopup("success");
        });
    };
    CancelBikes();
  };
  return (
    <Spin indicator={antIcon} spinning={isSpinning}>
      <div className="bike-item row">
        <div className="col-6 col-lg-8 bike-title">
          <span>{props.bikeDetails.model}</span>
          <span className="date">
            {props.bikeDetails.color} {props.bikeDetails.location}{" "}
            {props.bikeDetails.bookingStatus}
          </span>
        </div>
        <div className="col-6 col-lg-4">
          <div className="row">
            <div className="col-12 col-sm-6 bike-amount">
              Avg. Rating: {props.bikeDetails.avgRating}
            </div>
            <div className="col-12 col-sm-6 bike-actions">
              {props.bikeDetails.bookingStatus === "canceled" ? (
                ""
              ) : (
                <div className="edit" type="button" onClick={cancelBooking}>
                  <i className="edit-icon">cancel Booking</i>
                </div>
              )}

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

export default BookedBike;
