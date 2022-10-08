import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useCookies } from "react-cookie";
import axios from "axios";

function Signin() {
  const [cookies] = useCookies([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

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
          ? `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/Signin`
          : "https://student-dashboards.herokuapp.com/Signin",
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
      <h2 className="signinlabel">Sign In</h2>
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
          Don't have an account?{""}
          <Link to="/register" className="registerbutton">
            Register
          </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signin;
