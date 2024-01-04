import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { Link } from "react-router-dom";
function CrudTable(props) {
	const [category, setCategory] = useState("");
	const [searchCategory, setsearchCategory] = useState("");
	const [searchval, setSearchval] = useState("");
	const [cruds, setCruds] = useState([]);
	const handleSearch=async (e)=>{
		e.preventDefault();
		try {
			if(searchCategory==="" || searchval===""){
				props.showAlert("please fill required values",'danger');
				return;
			}
			const response = await Axios.get(`https://mindful-gurukul-task-backend.onrender.com/Sapi/cruds/search/${searchCategory}/${searchval}`);
			if(response){
				console.log(response);
				setCruds(response.data);
			}else{
				console.log('nothing found');
			}
		} catch (error) {
			console.log(error);
		}
	}
	const handleFilter=async (e)=>{
		e.preventDefault();
		console.log(category);
		localStorage.setItem('cat',category);
		try {
			const response = await Axios.get(`https://mindful-gurukul-task-backend.onrender.com/api/cruds/filterby/${category}`);
			setCruds(response.data);
		} catch (error) {
			console.log(error);
		}
	}
	useEffect(function () {
		async function getCruds() {
			try {
					const fc=localStorage.getItem("cat")||"";
					if(fc===""){
						const response = await Axios.get("https://mindful-gurukul-task-backend.onrender.com/api/cruds");
						setCruds(response.data);
					}else{
						const response = await Axios.get(`https://mindful-gurukul-task-backend.onrender.com/api/cruds/filterby/${fc}`);
						setCruds(response.data);
						
					}
				
			} catch (error) {
				console.log("error", error);
			}
		}
		getCruds();
	}, []);

	return (
		<div className="container">
			<div>
				<h2>
					CRUD - Table View
					<p>
						<Link to="/cruds/new" className="btn btn-primary float-right">
							Create CRUD
						</Link>
					</p>
				</h2>
				<hr />
		<form >
				<label for="category"> Sort by  :</label>  &nbsp;&nbsp;
            <select name="category" id="category" onChange={(e)=>{
					setCategory(e.target.value);
					}}>
						 <option disabled selected value> -- select an option -- </option>
              <option value="lastmodified">Last modified </option>
              <option value="lastinserted">Last inserted </option>
              <option value="namedsc">Name (z-a)</option>
              <option  value="nameasc">Name (a-z)</option>
            </select>
			&nbsp;&nbsp;
			<button className="btn btn-primary " onClick={handleFilter}>Apply Filter</button>
			&nbsp;&nbsp;
			<label htmlFor="searchq">Search by:</label> &nbsp;&nbsp;
			<select name="searchq" defaultValue="email" id="searchq" onChange={(e)=>{
					setsearchCategory(e.target.value);
					}}>
			  <option disabled selected value> -- select an option -- </option>
              <option value="phone">Phone </option>
              <option value="name">Name</option>
              <option value="email">Email</option>
            </select>
			&nbsp;&nbsp;
			<label>Search value: </label>
			<input type="text" name="search"  onChange={(e)=>{
				setSearchval(e.target.value);
			}}/>
			&nbsp;&nbsp;
			<button className="btn btn-primary " onClick={handleSearch}>Search</button>
          <hr />

				</form>
			</div>
		
                        <div className="table-responsive">
			<table className="table riped  table-hover table-bordered container">
				<thead>
					<tr>
						<th>Name</th>
						<th>Phone</th>
						<th>Email</th>
						<th>View</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{cruds &&
						cruds.map((crud) => {
							return (
								<tr key={crud._id}>
									<td>
										<Link to={`/cruds/${crud._id}`} className="link-line">
											{crud.name}
										</Link>
									</td>
									<td>{crud.phone}</td>
									<td>{crud.email}</td>
									<td>
										<Link to={`/cruds/${crud._id}`} className="btn btn-warning">
											View
										</Link>
									</td>
									<td>
										<Link
											to={`/cruds/${crud._id}/edit`}
											className="btn btn-success"
										>
											Edit
										</Link>
									</td>
									<td>
										<Link
											to={`/cruds/${crud._id}/delete`}
											className="btn btn-danger"
										>
											Delete
										</Link>
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
			</div>
		</div>
	);
}

export default CrudTable;
