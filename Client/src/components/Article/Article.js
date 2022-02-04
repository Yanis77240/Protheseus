import React from "react";
import { Link } from "react-router-dom";
import "./Article.css";

const Article = ({ prothese }) => {
	const PF = "http://localhost:3001/images/";
	return (
		<div className="article">
			{prothese.photo && <img className="articleImg" src={PF + prothese.photo} alt="" />}
			<div className="articleInfo">
				<div className="articleCats"></div>
				<span className="articleTitle">
					<Link to={`/protheses/${prothese._id}`} className="link">
						{prothese.type}
					</Link>
				</span>
				<hr />
				<span className="articleDate">
					{new Date(prothese.createdAt).toDateString()}
				</span>
			</div>
			<p className="articleDesc">{prothese.description}</p>
		</div>
	);
};

export default Article;
