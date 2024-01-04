import './App.css';
import React, {useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Alert from './Components/Alert';
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Navbar from './Components/Navbar';
import CrudAdd from './Components/cruds/CrudAdd';
import CrudTable from "./Components/cruds/CrudTable";
import CrudListView from "./Components/cruds/CrudListView";
import CrudGridView from "./Components/cruds/CrudGridView";
import CrudDetails from "./Components/cruds/CrudDetails";
import CrudEdit from "./Components/cruds/CrudEdit";
import CrudDelete from "./Components/cruds/CrudDelete";
import isOnline from './utils/checkInternetConnection';
import InternetConnectionMessage from './Components/InternetConnectionMessage';
function App() {
  const online=isOnline();
  const [alert, setalert] = useState(null);

  const showAlert=(message,type)=>{
    setalert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setalert(null);
    }, 1500);
  }
  const islogin=()=>{
    if(localStorage.getItem("token"))return true;
    return false;
  }
  const checklogin=islogin()

  const backgroundStyle ={background: 'linear-gradient(to right, #ffe4e1, #ffffff)',minHeight: '100%',minWidth:'100%'}

  return (
    <div style={backgroundStyle}>
      {online ? (
        <Router>
        <Navbar />
        <Alert alert={alert}/>
        <div >
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert} />} />
          <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
          <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
          <Route exact path="/api/" element={<Home  showAlert={showAlert}/>} />
					<Route exact path="/cruds" element={<CrudTable  showAlert={showAlert}/>} />					
					<Route exact path="/cruds/list-view" element={<CrudListView  showAlert={showAlert}/>} />
					<Route exact path="/cruds/grid-view" element={<CrudGridView  showAlert={showAlert}/>} />
					<Route exact path="/cruds/new" element={<CrudAdd  showAlert={showAlert}/>} />
					<Route exact path="/cruds/:_id" element={<CrudDetails  showAlert={showAlert}/>} />
					<Route exact path="/cruds/:_id/edit" element={<CrudEdit  showAlert={showAlert}/>} />
					<Route exact path="/cruds/:_id/delete" element={<CrudDelete  showAlert={showAlert}/>} />
        </Routes>
        </div>
      </Router>
      ) : (
        <InternetConnectionMessage/>
      )}
    </div>
  );
}

export default App;
