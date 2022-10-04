import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function Secret() {
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
        } else toast(`Hi ${data.user}`, { theme: "dark" });
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const signOut = () => {
    removeCookie("jwt");
    navigate("/Signin");
  };
  return (
    <>
      <div>
        <h1>Secret Page</h1>
        <button onClick={signOut}>Log Out</button>
        <ToastContainer />
      </div>
    </>
  );
}
