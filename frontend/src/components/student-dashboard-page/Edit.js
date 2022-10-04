import React, { useEffect } from "react";
import Header from "../Headers/RootHeader/Header";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Verification from "../../User-Pages/Verification";

export default function Edit() {
  Verification();
  return (
    <div>
      <Header />
      Edit
    </div>
  );
}
