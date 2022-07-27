import React, { useContext, useState, useEffect } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Bike from "../Bikes/Bike";
import { bikeData } from "../../App";
import Pagination from "../Pagination/Pagination";

const FilteredBikes = (props) => {
  const [isSpinning, setSpinning] = useState(false);
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: "#ff4400" }} spin />
  );

  const [filteredBikeList, setFilteredBikeList] = useState([]);
  const { popupMsg, notificationPopup, user } = useContext(bikeData);
  const [currentPageofFilteredBikeList, setCurrentPageofFilteredBikeList] =
    useState(1);
  const [totalPageofFilteredBikeList, setTotalPageofFilteredBikeList] =
    useState();

  const URL =
    props.avgRatingValue === undefined
      ? `http://localhost:5000/bikes?isAvailable=true&sortBy=createdAt:desc&limit=5&skip=${
          currentPageofFilteredBikeList === 1
            ? 0
            : (currentPageofFilteredBikeList - 1) * 5
        }&search=${props.searchValue}`
      : `http://localhost:5000/bikes?isAvailable=true&sortBy=createdAt:desc&limit=5&skip=${
          currentPageofFilteredBikeList === 1
            ? 0
            : (currentPageofFilteredBikeList - 1) * 5
        }&avgRating=${props.avgRatingValue}`;


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
            setFilteredBikeList([data]);
            setSpinning(false);
          } else if (data.error) {
            //setting notification pop
            popupMsg.current = data.error;
            notificationPopup("error");
            setSpinning(false);
          } else if (data.bike) {
            setFilteredBikeList(data.bike);
            setCurrentPageofFilteredBikeList(data.currentPage);
            setTotalPageofFilteredBikeList(data.totalPage);
            setSpinning(false);
          }
        });
    };

    fetchBookedBikes();
  }, [popupMsg.current, window.location.href, currentPageofFilteredBikeList]);

  let bikes;
  if (filteredBikeList[0]?.msg) {
    bikes = <div className="bike-item no-bike">No bikes Found!</div>;
  } else {
    bikes = filteredBikeList.map((bike) => {
      return <Bike key={bike._id} bikeDetails={bike} />;
    });
  }

  const paginate = (pageNumber) => setCurrentPageofFilteredBikeList(pageNumber);

  return (
    <React.Fragment>
      <Spin indicator={antIcon} spinning={isSpinning}>
        {bikes}
        {filteredBikeList[0]?.msg ? (
          ""
        ) : (
          <Pagination
            totalPage={totalPageofFilteredBikeList}
            currentPage={currentPageofFilteredBikeList}
            paginate={paginate}
          />
        )}
      </Spin>
    </React.Fragment>
  );
};

export default FilteredBikes;
