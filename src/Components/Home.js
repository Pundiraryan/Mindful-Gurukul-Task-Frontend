import React from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";

export default function Home(props) {
  if (localStorage.getItem("token") != null) {
    return (
      <Dashboard showAlert={props.showAlert} />
    );
  }
  else{
    return(
      <Login/>
    );
  }
}
