import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { bikeData } from "../../App";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import BikeReview from "./BikeReview";
import Pagination from "../Pagination/Pagination";

const BikeDetails = () => {
  const { bikeId } = useParams();
  const navigate = useNavigate();
  const {
    bikeList,
    user,
    bikeReviewsList,
    setBikeReviewsList,
    fromToDate,
    currentPageOfReviewList,
    setCurrentPageOfReviewList,
    totalPageOfReviewList,
    setTotalPageOfReviewList,
    popupMsg,
    notificationPopup,
    setBikeList,
  } = useContext(bikeData);
  const [isSpinning, setSpinning] = useState(false);

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: "#ff4400" }} spin />
  );
  const [currentBike, setCurrentBike] = useState();
  const BIKE_URL = `http://localhost:5000/bikes/${bikeId}`;
  const REVIEW_URL = `http://localhost:5000/reviews/all/${bikeId}?sortBy=createdAt:desc&limit=5&skip=${
    currentPageOfReviewList === 1 ? 0 : (currentPageOfReviewList - 1) * 5
  }`;

  useEffect(() => {
    setSpinning(true);
    const fetchCurrentBike = async () => {
      await fetch(BIKE_URL, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.msg) {
            setCurrentBike([data]);
            setSpinning(false);
          } else if (data.error) {
            //setting notification pop
            popupMsg.current = data.error;
            notificationPopup("error");
            setSpinning(false);
          } else {
            setCurrentBike(data);
            setSpinning(false);
          }
        });
    };

    fetchCurrentBike();

    const fetchReviews = async () => {
      await fetch(REVIEW_URL, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.msg) {
            setBikeReviewsList([data]);
            setSpinning(false);
          } else if (data.error) {
            //setting notification pop
            popupMsg.current = data.error;
            notificationPopup("error");
            setSpinning(false);
          } else {
            setBikeReviewsList(data.review);
            setCurrentPageOfReviewList(data.currentPage);
            setTotalPageOfReviewList(data.totalPage);
            setSpinning(false);
          }
        });
    };

    fetchReviews();
  }, [currentPageOfReviewList]);

  const bookBikeHandler = () => {
    const URL = `http://localhost:5000/bookedBikes/${bikeId}`;
    setSpinning(true);
    const BookBikes = async () => {
      await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          startDate: fromToDate[0],
          endDate: fromToDate[1],
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            //setting notification pop
            popupMsg.current = data.error;
            notificationPopup("error");
            setSpinning(false);
          } else {
            const updatedBikeList = bikeList.filter((bike) => {
              return bike._id !== bikeId;
            });
            setBikeList(updatedBikeList);
            setSpinning(false);

            popupMsg.current = "Bike Booked SuccesFully!";
            notificationPopup("success");
          }
        });
    };
    BookBikes();
  };

  const paginate = (pageNumber) => setCurrentPageOfReviewList(pageNumber);

  let reviewContent;
  if (bikeReviewsList[0]?.msg) {
    reviewContent = <p>{bikeReviewsList[0]?.msg}</p>;
  } else {
    reviewContent = bikeReviewsList.map((bikeReview) => {
      return <BikeReview key={bikeReview._id} bikeReview={bikeReview} />;
    });
  }

  return (
    <React.Fragment>
      <Spin indicator={antIcon} spinning={isSpinning}>
        <button className="btn-4" onClick={() => navigate("/bookBikes")}>
          Back
        </button>
        <div className="row">
          <div className="col-6"></div>
          <div className="col-6">
            <p>{currentBike?.model}</p>
            <p>{currentBike?.color}</p>
            <p>{currentBike?.location}</p>
            <p>{currentBike?.avgRating}</p>
            <button onClick={bookBikeHandler}>Book Bike</button>
          </div>
        </div>
        <div className="row">
          <p>Reviews:</p>
          {reviewContent}
        </div>
        {bikeReviewsList[0]?.msg ? (
          ""
        ) : (
          <Pagination
            totalPage={totalPageOfReviewList}
            currentPage={currentPageOfReviewList}
            paginate={paginate}
          />
        )}
      </Spin>
    </React.Fragment>
  );
};

export default BikeDetails;
