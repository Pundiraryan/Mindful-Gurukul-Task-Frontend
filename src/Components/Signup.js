import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {

  const buttonStyle = {
    background: '#FF6F61' ,
    color: 'white', // Text color
    padding: '10px 20px', // Adjust padding as needed
    borderRadius: '8px', // Rounded border radius
    cursor: 'pointer', // Cursor pointer on hover
    transition: 'background-color 0.3s ease', // Smooth transition on hover
    border: 'none', // Remove border
    outline: 'none', // Remove outline on focus
  };

  const [formData, setformData] = useState({name:"",email:"",password:"",cpassword:"",phone:""})

  const navigate = useNavigate();

  const redirect=()=>{
    navigate("/");
  }


  const handleOnChange=(e)=>{
  setformData({...formData, [e.target.name]:e.target.value,} )
  }

  const handleSubmit=async(e)=>{

    e.preventDefault();
    const {name,email,password,cpassword,phone}=formData

    try {
      if (cpassword!==password){
        props.showAlert("Password does not match!", "warning")
        return;
      }
      const response= await fetch('https://mindful-gurukul-task-backend.onrender.com/api/auth/createuser', 
        {method: 'POST',
         headers:{
          "Content-Type":'application/json',
         },
         body:JSON.stringify({name,email,password,phone})
        }
      )

      if (response.ok) {
        const json = await response.json();
        console.log(json);
        // save the authtoken
        localStorage.setItem('token', json.authtoken);
        // redirect
        redirect();
        props.showAlert("Account created successfully!","success")
      } 
      
      else{
        props.showAlert("Invalid credentials", "danger" )
      }
      
      
    } catch (error) {
      console.error("Signup failed:", error.message);
    }
  }

  return (
    <div style={{ background : 'linear-gradient(to right, #ffe4e1, #ffffff)'}}>
      <form onSubmit={handleSubmit}>
      <h1 className="h3 mb-3 fst-normal">Signup</h1>
        <div>
          <label>User Name</label> &nbsp;
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            onChange={handleOnChange}
          />
          <hr />
        </div>
        <div>
          <label>Email address</label> &nbsp;
          <input
            type="email"
            id="email"
            name="email"
            placeholder="name@example.com"
            onChange={handleOnChange}
          />
          <hr />
        </div>
        <div>
          <label>Phone</label> &nbsp;
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Your Phone"
            onChange={handleOnChange}
          />
          <hr />
        </div>
        <div>
         
          <label>Gender</label> &nbsp;
          <span>
          Male:<input type="radio" name="gender" id="male" value="male"/>
           Female:<input type="radio" name="gender" id="female" value="female"/>
          </span>
          <hr />
        </div>
        <div>
          <label>Password</label>&nbsp;
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={handleOnChange}
          />
          <hr />
        </div>
        <div>
          <label>Confirm Password</label>&nbsp;
          <input
            type="password"
            id="cpassword"
            name="cpassword"
            placeholder="Password"
            onChange={handleOnChange}
          />
          <hr />
        </div>
        <div >
          <label>How did you hear about this?</label> <br />
        <input type="checkbox" id="hearingoption1" name="hearingoption1" value="Bike" />
  <label for="hearingoption1"> Linkedin</label><br /> 
  <input type="checkbox" id="hearingoption2" name="hearingoption2" value="Car" />
  <label for="hearingoption2">Friends</label><br />
  <input type="checkbox" id="hearingoption3" name="hearingoption3" value="Boat" />
  <label for="hearingoption3"> Job Portal </label><br />
  <input type="checkbox" id="hearingoption3" name="hearingoption3" value="Boat" />
  <label for="hearingoption3"> Others</label><br />
          <hr />
        </div>
        <div >
          <label for="city"> City :</label>
            <select name="city" id="city">
              <option value="mumbai">Mumbai</option>
              <option value="pune">Pune</option>
              <option value="ahmedabad">Ahmedabad</option>
            </select>
          <hr />
        </div>
        <div >
          <label for="state"> State :</label>
          <input type="text" list="states" 
                        placeholder="Enter Here" /> 
            <datalist id="states"> 
                <option value="Gujarat">Gujarat</option> 
                <option value="Maharashtra">Maharashtra</option> 
                <option value="Karnataka">Karnataka</option> 
            </datalist> 
          <hr />
        </div>
        <button className="btn  w-100 py-2 my-3"  style={buttonStyle} type="submit">
          Signup
        </button>
      </form>
    </div>
  )
}
