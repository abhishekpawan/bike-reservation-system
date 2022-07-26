import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "antd";
import moment from "moment";
import { bikeData } from "../../App";
const { RangePicker } = DatePicker;

const FilterMenus = () => {
  const navigate = useNavigate();
  const { fromToDate, setFromToDate, popupMsg, notificationPopup } =
    useContext(bikeData);

  useEffect(() => {
    if (fromToDate[0] === null) {
      navigate("/");
    }
  }, [fromToDate]);

  const disabledFromDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  };
  return (
    <div className="filterMenus">
      <p>Filter By:</p>
      <div className="row">
        <div className="col-6 col-md-2">
          <input type="text" placeholder="Model name" />
        </div>
        <div className="col-6 col-md-2">
          <input type="text" placeholder="Color" />
        </div>
        <div className="col-6 col-md-2">
          <input type="text" placeholder="location" />
        </div>
        <div className="col-6 col-md-2">
          <label htmlFor="minRating">Min Rating</label>
          <select name="minRating" id="minRating" placeholder="Min Rating">
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
    </div>
  );
};

export default FilterMenus;
