import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/AuthContext";
import { logoutUser } from "../utils/auth";
import ApiServerClient from "../ApiServerClient";
import "../css/Landing.css";
import { Container } from "react-bootstrap";

export default function Login() {
  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log(user);
    if (user && user.name !== "Guest") {
      logoutUser(user, setUser, navigate, toast);
    } else if (user && user.name === "Guest") {
      setUser(null);
      toast.success("Guest logged out.");
    }
  }, []);

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data; // destructuring data object
    try {
      // payload to be sent to the server for registration
      const res = await ApiServerClient.auth("UsersTb", {
        data
      });
      // console.log(res);
      if(res){
        toast.success("تم تسجيل الدخول بنجاح.");
       setData({});
       setUser(res);
       navigate("/");
      }
     else{
      toast.success("المستخدم غير مسجل الدخول");
     }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.error) {
        toast.error(error.response.data.error);
      }
    }
  };
  return (
    <Container fluid className="landing-container">
      <div>
        <h1>تسجيل الدخول</h1>
        <div className="have-account">
          {/* <h2>Or why don't you</h2> */}
          <button 
          onClick={() => navigate("/register")}
          className="login-register-btn">تسجيل جديد</button>
        </div>
      </div>
      <form
        onSubmit={loginUser}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <div className="form-input-box">
          <input
            type="email"
            placeholder="أدخل البريد الإلكتروني..."
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="form-input-inner"
          />
        </div>
        <div className="form-input-box">
          <input
            type="password"
            placeholder="enter password..."
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="form-input-inner"
          />
        </div>
        <button className="login-register-btn-bottom" type="submit">
          تسجيل
        </button>
      </form>
      <button
        className="guest-btn"
        onClick={() => {
          setUser({ name: "Guest" });
          navigate("/");
          toast.success("Logged in as Guest.");
        }}
      >
        زائر
      </button>
    </Container>
  );
}
