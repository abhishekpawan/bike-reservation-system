import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { bikeData } from "../../App";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import loginImage from "../../assets/bikeslogo.png";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  let password_regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [passwordType, setPasswordType] = useState("hide");
  const [confirmPasswordType, setConfirmPasswordType] = useState("hide");
  let email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const [isEmailValid, setEmailValid] = useState(false);
  const {
    isUserLoggedIn,
    setUserLoggedin,
    setUser,
    popupMsg,
    notificationPopup,
  } = useContext(bikeData);

  const URL = "http://localhost:5000/users/register";

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
    } else if (password !== confirmPassword) {
      popupMsg.current = "The passwords doesn't match! Please Try Again";
      notificationPopup("error");
    } else {
      setSpinning(true);

      const userData = {
        name: username,
        email: email,
        password: password,
        role: "user",
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
          //setting notification pop
          popupMsg.current = data.error;
          notificationPopup("error");
          setSpinning(false);
        } else {
          localStorage.setItem("BRS_user", JSON.stringify(data));
          setUser(data);
          setUserLoggedin(true);
          setSpinning(false);

          //setting notification pop
          popupMsg.current = "Registration successfull!";
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
              <div className="container">
                <div className="user signinBx">
                  <div className="formBx">
                    <form onSubmit={submitHandler}>
                      <h2>Register</h2>

                      <input
                        type="text"
                        maxLength={10}
                        minLength={5}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                      />
                      <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Email"
                      />
                      <div className="pd">
                        <input
                          type={passwordType === "hide" ? "password" : "text"}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          placeholder="Password"
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
                      <div className="pd">
                        <input
                          type={
                            confirmPasswordType === "hide" ? "password" : "text"
                          }
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          placeholder="Confirm Password"
                        />
                        {confirmPasswordType === "hide" ? (
                          <i onClick={() => setConfirmPasswordType("show")}>
                            <AiFillEyeInvisible />
                          </i>
                        ) : (
                          <i onClick={() => setConfirmPasswordType("hide")}>
                            <AiFillEye />
                          </i>
                        )}
                      </div>
                      <div className="bt">
                        <button className="btn-4" type="submit">
                          Register
                        </button>
                      </div>
                      <p className="signup">
                        Already have an account ?
                        <a href="#" onClick={() => navigate("/login")}>
                          Sign In.
                        </a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4 loginForm">
              <img src={loginImage} alt="loginImage" />
            </div>
          </div>
        </section>
      </Spin>
    </React.Fragment>
  );
};

export default Register;
