import React, { useContext, useEffect, useState } from "react";
import { bikeData } from "../../App";
import BookedBike from "./BookedBike";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import Pagination from "../Pagination/Pagination";

const Reservations = () => {
  const [isSpinning, setSpinning] = useState(false);
  const {
    user,
    popupMsg,
    notificationPopup,
    bookedBikeList,
    setBookedBikeList,
  } = useContext(bikeData);
  const [currentPageofBookedBikeList, setCurrentPageofBookedBikeList] =
    useState(1);
  const [totalPageofBookedBikeList, setTotalPageofBookedBikeList] = useState();

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: "#ff4400" }} spin />
  );

  const URL = `http://localhost:5000/bookedBikes/all?sortBy=createdAt:desc&limit=5&skip=${
    currentPageofBookedBikeList === 1
      ? 0
      : (currentPageofBookedBikeList - 1) * 5
  }`;
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
            setBookedBikeList([data]);
            setSpinning(false);
          } else if (data.error) {
            //setting notification pop
            popupMsg.current = data.error;
            notificationPopup("error");
            setSpinning(false);
          } else if (data.bookedBike) {
            setBookedBikeList(data.bookedBike);
            setCurrentPageofBookedBikeList(data.currentPage);
            setTotalPageofBookedBikeList(data.totalPage);
            setSpinning(false);
          }
        });
    };

    fetchBookedBikes();
  }, [popupMsg.current, currentPageofBookedBikeList]);

  let bikes;
  if (bookedBikeList[0]?.msg) {
    bikes = <div className="bike-item no-bike">No Reservations Available!</div>;
  } else {
    bikes = bookedBikeList.map((bookedBike) => {
      return <BookedBike key={bookedBike._id} bikeDetails={bookedBike} />;
    });
  }

  const paginate = (pageNumber) => setCurrentPageofBookedBikeList(pageNumber);

  return (
    <Spin indicator={antIcon} spinning={isSpinning}>
      {bikes}
      {bookedBikeList[0]?.msg ? (
        ""
      ) : (
        <Pagination
          totalPage={totalPageofBookedBikeList}
          currentPage={currentPageofBookedBikeList}
          paginate={paginate}
        />
      )}
    </Spin>
  );
};

export default Reservations;
