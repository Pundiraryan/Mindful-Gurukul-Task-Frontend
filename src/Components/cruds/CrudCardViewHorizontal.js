import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function CrudCardViewHorizontal() {
	const [cruds, setCruds] = useState([]);

	useEffect(function () {
		async function getCruds() {
			try {
				const response = await Axios.get("https://mindful-gurukul-task-backend.onrender.com/api/cruds");
				setCruds(response.data);
			} catch (error) {
				console.log("error", error);
			}
		}
		getCruds();
	}, []);

	return (
		<div className="container">
			<h2>
				CRUD - Row Card View
				<p>
					<Link to="/cruds/new" className="btn btn-primary">
						Create CRUD
					</Link>
				</p>
			</h2>
			<hr />

			{cruds.map((crud) => {
				return (
					<div
						className="card mb-3"
						style={{ maxWidth: "800px" }}
						key={crud._id}
					>
						<div className="row g-0">
							<div className="col-md-4 pl-5 ">
								{/* <img src="..." className="img-fluid rounded-start" alt="..."> */}
								<h5>Logo</h5>
							</div>
							<div className="col-md-8">
								<div class="card-header">
									<h5 className="card-title">
										<Link to={`/cruds/${crud._id}`} className="link-line">
											{crud.name}
										</Link>
									</h5>
								</div>
								<div className="card-body ">
									<h6 className="d-flex align-items-center">
										<i className="bi bi-telephone-fill text-success"></i>
										<a
											className="card-subtitle m-2"
											href={`tel:+${crud.phone}`}
										>
											{crud.phone}
										</a>
									</h6>

									<div class="card-footer">
										<Link
											to={`/cruds/${crud._id}/edit`}
											className="btn btn-primary"
										>
											Edit
										</Link>
										<span>
											<small>
												<Link to={`/cruds/${crud._id}`} className="link-line">
													Read More...
												</Link>
											</small>
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default CrudCardViewHorizontal;
