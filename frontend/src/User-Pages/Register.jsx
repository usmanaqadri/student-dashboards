import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const generateError = (err) =>
    toast.error(err, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        process.env.NODE_ENV === "development"
          ? `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/register`
          : "https://student-dashboards.herokuapp.com/register",
        {
          ...values,
        },
        {
          withCredentials: true,
        }
      );
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="signinpage">
      <h1 className="welcome">Welcome to Student Dashboards!</h1>
      <h2 className="signinlabel">Register Account</h2>
      <form className="signinform" onSubmit={(e) => handleSubmit(e)}>
        <div className="signindiv">
          <input
            className="signininput"
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className="signindiv">
          <input
            className="signininput"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className="submitdiv">
          <button type="submit" className="submitbutton">
            Submit
          </button>
        </div>
        <span className="registertext">
          Already have an account?{" "}
          <Link to="/signin" className="registerbutton">
            Sign In
          </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}
