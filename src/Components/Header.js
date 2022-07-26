import React, { useContext } from "react";
import { bikeData } from "../App";
import { useNavigate } from "react-router-dom";
import bikeslogoheader from "../assets/bikeslogoheader.png";

const Header = () => {
  const navigate = useNavigate();
  const { user, setUserLoggedin, popupMsg, notificationPopup } =
    useContext(bikeData);
  const currentURL = window.location.href;

  const logoutHandler = () => {
    localStorage.removeItem("BRS_user");
    setUserLoggedin(false);
    navigate("/login");

    //setting notification pop
    popupMsg.current = "You have been Logged-out";
    notificationPopup("success");
  };

  return (
    <React.Fragment>
      <div className="header row">
        <div className="col-12 col-sm-6 title">
          <img src={bikeslogoheader} alt="bikeslogoheader" />
        </div>
        <div className="col-12 col-sm-6 userDetails">
          <p className="username">
            <span>Welcome, </span>
            {user?.name}
          </p>
          <p className="email">{user?.email}</p>
          <div className="buttons">
            <button className="btn-4" onClick={logoutHandler}>
              Logout
            </button>
            {currentURL.split("/")[3] === "reservations" ? (
              <button
                className="btn-4"
                onClick={() => navigate("/")}
              >
                Back
              </button>
            ) : (
              <button
                className="btn-4"
                onClick={() => navigate("/reservations")}
              >
                Redervations
              </button>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
