import React, { Component, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Signin from "../../../User-Pages/Signin";

export default function Nav() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const signOut = () => {
    removeCookie("jwt");
    navigate("/Signin");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/new">New Dashboard</Link>
        </li>
        <li>
          <button onClick={signOut}>Log Out</button>
        </li>
      </ul>
    </nav>
  );
}
