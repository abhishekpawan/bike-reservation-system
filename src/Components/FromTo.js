import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "antd";
import moment from "moment";
import { bikeData } from "../App";
const { RangePicker } = DatePicker;

const FromTo = () => {
  const navigate = useNavigate();
  const { fromToDate, setFromToDate, popupMsg, notificationPopup } = useContext(bikeData);

  const disabledFromDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  };

  const bookingHandler = () => {
    if (fromToDate[0] !== null) {
      navigate("/bookBikes");
    } else {
      //setting notification pop
      popupMsg.current = "Please select a start and end date for booking!";
      notificationPopup("error");
    }
  };
  return (
    <React.Fragment>
      <h1>Choose a start date and an end date to start booking bikes!</h1>
      <div className="row from-to">
        <RangePicker
          disabledDate={disabledFromDate}
          onChange={(date, dateString) => {
            setFromToDate(dateString);
          }}
        />
        <button className="btn-4" onClick={bookingHandler}>
          Continue Booking{" "}
        </button>
      </div>
    </React.Fragment>
  );
};

export default FromTo;
