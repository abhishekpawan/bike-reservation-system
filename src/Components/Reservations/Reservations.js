import React, { useContext, useEffect, useState } from "react";
import { bikeData } from "../../App";
import BookedBike from "./BookedBike";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Reservations = () => {
  const [isSpinning, setSpinning] = useState(false);
  const {
    user,
    popupMsg,
    notificationPopup,
    bookedBikeList,
    setBookedBikeList,
  } = useContext(bikeData);

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: "#ff4400" }} spin />
  );

  const URL = `http://localhost:5000/bookedBikes/all`;
  useEffect(() => {
    setSpinning(true);
    const fetchBookedBikes = async () => {
      await fetch(URL, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.msg) {
            return setBookedBikeList([data]);
          } else if (data.error) {
            //setting notification pop
            popupMsg.current = data.error;
            notificationPopup("error");
            setSpinning(false);
          }
          setBookedBikeList(data);
          //   setCurrentPageOfBikeList(data.currentPage)
          //   setTotalPageOfBikeList(data.totalPage)
          setSpinning(false);
        });
    };

    fetchBookedBikes();
  }, [popupMsg.current]);

  let bikes;
  if (bookedBikeList.length > 0) {
    bikes = bookedBikeList.map((bookedBike) => {
      return <BookedBike key={bookedBike._id} bikeDetails={bookedBike} />;
    });
  } else {
    bikes = <p>No Reservations Available!</p>;
  }
  return (
    <Spin indicator={antIcon} spinning={isSpinning}>
      {bikes}
    </Spin>
  );
};

export default Reservations;
