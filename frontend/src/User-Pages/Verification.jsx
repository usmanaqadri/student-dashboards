import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function Verification() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/Signin");
      } else {
        const { data } = await axios.post(
          "http://localhost:3009",
          {},
          { withCredentials: true }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/Signin");
        } else toast(`Hi ${data.user}`);
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);
}
