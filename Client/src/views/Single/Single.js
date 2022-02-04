import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import SingleArticle from "../../components/SingleArticle/SingleArticle";
import "./Single.css";

const Single = () => {
	return (
		<div className="single">
			<SingleArticle />
			<Sidebar />
		</div>
	);
};

export default Single;
