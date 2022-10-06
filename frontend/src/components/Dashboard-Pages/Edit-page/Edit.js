import React from "react";
import Header from "../../Headers/RootHeader/Header";
import EditForm from "./EditForm";
import Verification from "../../../User-Pages/Verification";

const Edit = () => {
  Verification();
  return (
    <div>
      <Header />
      <EditForm />
    </div>
  );
};

export default Edit;
