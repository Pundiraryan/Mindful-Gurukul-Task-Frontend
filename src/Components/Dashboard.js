// Dashboard.js
import React from 'react';
import './Dashboard.css'; // Your custom styles
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
	const navigate=useNavigate();
  return (
    <div className="user-management-landing-page">
      <div className="content">
        <h1>Welcome to User Management</h1>
        <p className="lead">
          Easily manage your users with our intuitive and powerful user management application.
        </p>
        <button className="get-started-button" onClick={()=>{
			navigate("/cruds");
		}}>Get Started</button>
      </div>
    </div>
  );
};

export default Dashboard;
