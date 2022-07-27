import React, { useContext, useState } from "react";
import { bikeData, expenseData } from "../../App";
import { FaTimes } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const BookedBike = (props) => {
  const [isSpinning, setSpinning] = useState(false);
  const {
    popupMsg,
    notificationPopup,
    user,
    bookedBikeList,
    setBookedBikeList,
  } = useContext(bikeData);
  const [addReview, setAddReview] = useState(false);
  const [rating, setRating] = useState();
  const [review, setReview] = useState();

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: "#ff4400" }} spin />
  );

  const URL = `http://localhost:5000/bookedBikes/${props.bikeDetails._id}`;
  const REVIEW_URL = `http://localhost:5000/reviews/create/${props.bikeDetails.bikeId}`;

  const updatingBookedBikeDetails = async (body) => {
    await fetch(URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          //setting notification pop
          popupMsg.current = data.error;
          notificationPopup("error");
          setSpinning(false);
        } else {
          const updatedBookedBikeList = bookedBikeList.filter((bookedBike) => {
            return bookedBike._id !== props.bikeDetails._id;
          });
          updatedBookedBikeList.unshift(data);
          setBookedBikeList(updatedBookedBikeList);
          setSpinning(false);
          if (!body.isReviewed) {
            popupMsg.current = "Booking Canceled SuccesFully!";
            notificationPopup("success");
          }
        }
      });
  };
  const cancelBooking = () => {
    setSpinning(true);

    updatingBookedBikeDetails({
      bookingStatus: "canceled",
      isAvailable: true,
      avgRating: props.bikeDetails.avgRating,
    });
  };

  const reviewSubmitHandler = (e) => {
    e.preventDefault();
    setAddReview(false);
    const reviewData = {
      avgRating: parseInt(rating),
      review,
    };

    const addReviews = async () => {
      await fetch(REVIEW_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(reviewData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            //setting notification pop
            popupMsg.current = data.error;
            console.log(data.error);
            notificationPopup("error");
            setSpinning(false);
          } else {
            popupMsg.current = "Review Added SuccesFully!";
            notificationPopup("success");
          }
        });
    };
    addReviews();
    updatingBookedBikeDetails({
      isReviewed: true,
    });
    console.log(reviewData);
  };

  const cancelHandler = () => {
    setAddReview(false);
    setRating("none");
    setReview("");
  };

  var dateUTC  = new Date(props.bikeDetails.createdAt);
  dateUTC = dateUTC.getTime() 
  var DateIST = new Date(dateUTC);

  const bookingDate = `${DateIST.toString().split(" ")[2]} ${DateIST.toString().split(" ")[1]} ${DateIST.toString().split(" ")[3]} ${DateIST.toString().split(" ")[4]} `
 
  return (
    <Spin indicator={antIcon} spinning={isSpinning}>
      <div className="bike-item row">
        <div className="col-6 col-lg-8 bike-title">
          <span>{props.bikeDetails.model}</span>
          <span className="date">
            {props.bikeDetails.color} {props.bikeDetails.location}{" "}
            {props.bikeDetails.bookingStatus} {props.bikeDetails.startDate} {props.bikeDetails.endDate} {" "}
            Booked At: {bookingDate}
          </span>
        </div>
        <div className="col-6 col-lg-4">
          <div className="row">
            <div className="col-12 col-sm-6 bike-amount">
              {/* Avg. Rating: {props.bikeDetails.avgRating} */}
            </div>
            <div className="col-12 col-sm-6 bike-actions">
              {props.bikeDetails.bookingStatus === "canceled" ? (
                ""
              ) : (
                <div className="edit" type="button" onClick={cancelBooking}>
                  <i className="edit-icon">cancel Booking</i>
                </div>
              )}
            </div>
            <div className="col-12 col-sm-6 bike-actions">
              {props.bikeDetails.bookingStatus === "booked" &&
              props.bikeDetails.isReviewed === false ? (
                <button onClick={() => setAddReview(true)}>Add a Review</button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        {addReview && (
          <div>
            <form onSubmit={reviewSubmitHandler}>
              <label htmlFor="rating"> Rating:</label>
              <select
                name="rating"
                id="rating"
                onChange={(e) => setRating(e.target.value)}
                required
                value={rating}
              >
                <option value="">None</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>

              <textarea
                type="textarea"
                id="review"
                placeholder="Write you review"
                onChange={(e) => setReview(e.target.value)}
                required
              ></textarea>

              <button onClick={cancelHandler}>cancel</button>
              <button type="submit">submit</button>
            </form>
          </div>
        )}
      </div>
    </Spin>
  );
};

export default BookedBike;
