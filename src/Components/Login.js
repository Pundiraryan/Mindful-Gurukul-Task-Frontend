import React, { useState } from "react";
import { useNavigate ,Link } from 'react-router-dom';
import Axios from 'axios';
export default function Login(props) {

  const buttonStyle = {
    background: '#FF6F61',
    color: 'white', 
    padding: '10px 20px', 
    borderRadius: '8px', 
    cursor: 'pointer', 
    transition: 'background-color 0.3s ease', 
    border: 'none', 
    outline: 'none', 
  };
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const redirect=()=>{
    navigate("/", { replace: true });
    props.showAlert("Successfully Logged in!","success")
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    const data={
      email:email,
      password:password
    }
    try {
      const response = await Axios.post("https://mindful-gurukul-task-backend.onrender.com/api/auth/login", data);

      if (!response) {
        props.showAlert("Invalid credentials", "danger");
      }

      else{
        // const json = await response.json();
        // console.log(json);
        
        //save the authtoken
        localStorage.setItem('token',response.authtoken)
        //redirect
        redirect();
      }
      

     
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background : 'linear-gradient(to right, #ffe4e1, #ffffff)'}}>
      <form className="container " onSubmit={handleLogin} style={{ width: "35rem", backgroundColor:"white", padding:"10vh" ,borderRadius:"4%", }}>
        <h1 className="h3 mb-3 fst-normal" style={{color:"grey"}}>Login</h1>
        <div className="form-floating">
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleInputChange}
            style={{background:"transparent", border:"none"}}
          />
          <hr />
          <label htmlFor="floatingInput" >Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            style={{background:"transparent",border:"none"}}
          />
          <hr />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button className="btn w-100 py-2 my-3"  style={buttonStyle} type="submit">
          Login
        </button>
        <p> Don't have an account?
        <Link to="/signup">Signup Now!</Link>
        </p>
      </form>
    </div>
  );
}
