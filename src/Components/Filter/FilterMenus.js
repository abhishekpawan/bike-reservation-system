import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "antd";
import moment from "moment";
import { bikeData } from "../../App";
const { RangePicker } = DatePicker;

const FilterMenus = () => {
  const navigate = useNavigate();
  const { fromToDate, setFromToDate, popupMsg, notificationPopup } =
    useContext(bikeData);
  const [searchValue, setSearchValue] = useState();
  const [avgRatingValue,setAvgRatingValue] = useState()

  useEffect(() => {
    if (fromToDate[0] === null) {
      navigate("/");
    }
  }, [fromToDate]);

  const disabledFromDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  };

  const searchHandler = (e) => {
    e.preventDefault();
    setAvgRatingValue("none")
    navigate(`/search/${searchValue}`);
  };

  const avgRatingFilterHandler = (e) =>{
    setAvgRatingValue(e.target.value)
    navigate(`/filter/${e.target.value}`);
  }
  return (
    <div className="filterMenus">
      <div className="row">
        <div className="col-6 col-md-4">
          <form onSubmit={searchHandler}>
            <input
              type="text"
              placeholder="Search by Model,Location or Color"
              onChange={(e) => setSearchValue(e.target.value)}
              required
            />
            <button type="submit">Search</button>
          </form>
        </div>
        <div className="col-6 col-md-4">
          {/* <label htmlFor="minRating">Min Rating</label> */}
          <select name="minRating" value={avgRatingValue} id="minRating" placeholder="Min Rating" onChange={avgRatingFilterHandler}>
            <option value="none">Filter by Avg. Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="col-6 col-md-4">
          <RangePicker
            disabledDate={disabledFromDate}
            onChange={(date, dateString) => {
              setFromToDate(dateString);

              popupMsg.current = "From and To date changed!";
              notificationPopup("warning");
            }}
            defaultValue={[moment(fromToDate[0]), moment(fromToDate[1])]}
          />
        </div>
      </div>
      {window.location.href.split("/")[3] === "bookBikes" ? (
        ""
      ) : (
        <div>
          {window.location.href.split("/")[3] === "search" ? (
            <button onClick={() => navigate("/bookBikes")}>Reset Search</button>
          ) : (
            <button onClick={() => navigate("/bookBikes")}>Reset Filter</button>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterMenus;
