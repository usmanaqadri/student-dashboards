import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function Verification() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/Signin");
      } else {
        const { data } = await axios.post(
          process.env.NODE_ENV === "development"
            ? `http://localhost:${process.env.REACT_APP_BACKEND_PORT}`
            : "https://student-dashboards.herokuapp.com/",
          {},
          { withCredentials: true }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/Signin");
        }
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);
}
