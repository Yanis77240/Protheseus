import React from "react";
import Article from "../Article/Article";
import "./Articles.css";

const Articles = ({ protheses }) => {
	return (
		<div className="articles">
			{protheses.map((prothese) => (
				<Article
					prothese={prothese}
					key={prothese.id}
				/>
			))}
		</div>
	);
};

export default Articles;
