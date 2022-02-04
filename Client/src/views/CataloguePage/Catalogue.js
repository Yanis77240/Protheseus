import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Articles from "../../components/Articles/Articles";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import "./Catalogue.css";

const Catalogue = () => {
	const { search } = useLocation();
	const [protheses, setProtheses] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get("/protheses" + search);
			setProtheses(result.data);
		};
		fetchData();
	}, [search]);

	return (
		<>
			<img
				className="headerImg"
				src={require("assets/img/catalogue_image.jpg")}
				alt=""
			/>
			<div className="home">
				<Articles protheses={protheses} />
				<Sidebar />
			</div>
		</>
	);
};

export default Catalogue;
