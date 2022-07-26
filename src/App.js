import "./App.css";
import React, { useEffect, useState, useRef, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Components/Login&Register/Login";
import Register from "./Components/Login&Register/Register";
import "antd/dist/antd.css";
import { notification, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import FromTo from "./Components/FromTo";
import Header from "./Components/Header";
import BookBikes from "./Components/Bikes/BookBikes";
import Reservations from "./Components/Reservations/Reservations";

export const bikeData = createContext();

function App() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("BRS_user"));
  const [user, setUser] = useState(userData ? userData : null);
  const [isUserLoggedIn, setUserLoggedin] = useState(user ? true : false);
  const [isSpinning, setSpinning] = useState(false);
  const popupMsg = useRef();
  const [fromToDate, setFromToDate] = useState([null, null]);
  const [bikeList, setBikeList] = useState([]);
  const [currentPageOfBikeList, setCurrentPageOfBikeList] = useState(1)
  const [totalPageOfBikeList, setTotalPageOfBikeList] = useState()
  const [bookedBikeList, setBookedBikeList] = useState([]);



  const URL = `http://localhost:5000/bikes?sortBy=createdAt:desc&isAvailable=true&limit=5&skip=${(currentPageOfBikeList===1)?0:(currentPageOfBikeList-1)*5}`;

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: "#ff4400" }} spin />
  );

  useEffect(() => {
    if (isUserLoggedIn === false) {
      navigate("/login");
    }
  }, [isUserLoggedIn]);

  useEffect(() => {
    setSpinning(true);
    const fetchBikes = async () => {
      await fetch(URL, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.msg) {
            return setBikeList([data]);
          }
          setBikeList(data.bike);
          setCurrentPageOfBikeList(data.currentPage)
          setTotalPageOfBikeList(data.totalPage)
          setSpinning(false);
        });
    };
    // const fetchIncomes = async () => {
    //   await fetch(INCOME_URL, {
    //     headers: {
    //       Authorization: `Bearer ${user?.token}`,
    //     },
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       setIncomes(data);
    //       setSpinning(false);
    //     });
    // };fetchIncomes();

    fetchBikes();
  }, [isUserLoggedIn,currentPageOfBikeList]);


  const notificationPopup = (NotificationType) => {
    notification[NotificationType]({
      message: `${popupMsg.current}`,
    });
  };

  return (
    <bikeData.Provider
      value={{
        user,
        setUser,
        isUserLoggedIn,
        setUserLoggedin,
        isSpinning,
        setSpinning,
        popupMsg,
        notificationPopup,
        fromToDate,
        setFromToDate,
        bikeList,
        setBikeList,
        currentPageOfBikeList, setCurrentPageOfBikeList,
        totalPageOfBikeList, setTotalPageOfBikeList,
        bookedBikeList, setBookedBikeList
      }}
    >
      <div className="homeContainer">
        <Spin indicator={antIcon} spinning={isSpinning}>
          {isUserLoggedIn && <Header />}
          <Routes>
            <Route path="/" element={<FromTo />} />
            <Route path="/bookBikes" element={<BookBikes />} />
            <Route path="reservations" element={<Reservations/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<FromTo />} />
          </Routes>
        </Spin>
      </div>
    </bikeData.Provider>
  );
}

export default App;
