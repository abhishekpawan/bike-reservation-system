import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { bikeData } from "../../App";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import loginImage from "../../assets/bikeslogo.png";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import "../../App.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  let password_regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [passwordType, setPasswordType] = useState("hide");
  let email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const [isEmailValid, setEmailValid] = useState(false);
  const {
    isUserLoggedIn,
    setUserLoggedin,
    setUser,
    popupMsg,
    notificationPopup,
  } = useContext(bikeData);

  const URL = "http://localhost:5000/users/login";

  const [isSpinning, setSpinning] = useState(false);
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: "#ff4400" }} spin />
  );

  useEffect(() => {
    if (isUserLoggedIn === true) {
      navigate("/");
    }
  }, [isUserLoggedIn]);

  // Email validation
  useEffect(() => {
    if (email_regex.test(email)) {
      setEmailValid(true);
    } else setEmailValid(false);
  }, [email]);

  // Password validation
  useEffect(() => {
    if (password_regex.test(password)) {
      setPasswordValid(true);
    } else setPasswordValid(false);
  }, [password]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (isEmailValid === false) {
      //setting notification pop
      popupMsg.current = "Please enter a valid email address!";
      notificationPopup("error");
    } else if (isPasswordValid === false) {
      popupMsg.current =
        "password should be min 6 character with MIX of Uppercase, lowercase, digits!";
      notificationPopup("warning");
    } else {
      setSpinning(true);

      const userData = {
        email: email,
        password: password,
      };
      async function registerUser() {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        };
        const response = await fetch(URL, requestOptions);
        const data = await response.json();

        if (data.error) {
          popupMsg.current = data.error;
          notificationPopup("error");
          setSpinning(false);
        } else {
          localStorage.setItem("BRS_user", JSON.stringify(data));
          setUser(data);
          setUserLoggedin(true);
          setSpinning(false);

          //setting notification pop
          popupMsg.current = "Login successfull!";
          notificationPopup("success");
          navigate("/");
        }
      }

      registerUser();
    }
  };

  return (
    <React.Fragment>
      <Spin indicator={antIcon} spinning={isSpinning}>
        <section className="login">
         
          <div className="row loginPage">
            <div className="col-lg-6 d-none d-lg-block loginImage">
            <img src={loginImage} alt="loginImage" />
            </div>
            <div className="col-12 col-lg-4 loginForm">
              <div className="container">
                <div className="user signinBx">
                  <div className="formBx">
                    <form onSubmit={submitHandler}>
                      <h2>Sign In</h2>
                      <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <div className="pd">
                        <input
                          type={passwordType === "hide" ? "password" : "text"}
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        {passwordType === "hide" ? (
                          <i onClick={() => setPasswordType("show")}>
                            <AiFillEyeInvisible />
                          </i>
                        ) : (
                          <i onClick={() => setPasswordType("hide")}>
                            <AiFillEye />
                          </i>
                        )}
                      </div>
                      <div className="bt">
                        <button className="btn-4" type="submit">
                          Sign In
                        </button>
                      </div>
                      <p className="signup">
                        Don't have an account ?
                        <a href="#" onClick={() => navigate("/register")}>
                          Register.
                        </a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Spin>
    </React.Fragment>
  );
};

export default Login;
