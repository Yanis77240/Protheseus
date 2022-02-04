import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { useLocation } from "react-router";
import axios from "axios";
import Comments from "components/Comments/Comments";
import "./SingleArticle.css";

const SingleArticle = () => {
	const location = useLocation();
	const path = location.pathname.split("/")[2];
	const [prothese, setProthese] = useState({});
	const PF = "http://localhost:3001/images/";
	const { user } = useContext(Context);
	const username = user ? user.user.username : "";
	const [type, setType] = useState("");
	const [description, setDescription] = useState("");
	const [pros, setPros] = useState([]);
	const [cons, setCons] = useState([]);
	const [char, setChar] = useState([]);
	const [solutions, setSolutions] = useState([]);
	const [updateMode, setUpdateMode] = useState(false);

	useEffect(() => {
		const getProthese = async () => {
			const res = await axios.get("/protheses/" + path);
			setProthese(res.data);
			setType(res.data.type);
			setDescription(res.data.description);
			setPros(res.data.pros);
			setCons(res.data.cons);
			setChar(res.data.char);
			setSolutions(res.data.solutions);
		};
		getProthese();
	}, [path]);

	const handleDelete = async () => {
		try {
			await axios.delete(`/protheses/${prothese._id}`, {
				data: { author: user.user.username },
			});
			window.location.replace("/");
		} catch (err) {}
	};

	const handleUpdate = async () => {
		try {
			await axios.put(`/protheses/${prothese._id}`, {
				author: user.user.username,
				type,
				description,
				pros,
				cons,
				char,
				solutions,
			});
			setUpdateMode(false);
		} catch (err) {}
	};

	const text = (description, pros, cons, char, solutions) => {
		return (
			<>
				<p className="singleArticleDesc">
					{description}
					<br></br>
					<br></br>
					<ul class="comma-list">
						Avantages:
						{pros.map((pro) => (
							<li>{pro}</li>
						))}
					</ul>
					<br></br>
					<br></br>
					<ul>
						Inconvénients:
						{cons.map((con) => (
							<li>{con}</li>
						))}
					</ul>
					<br></br>
					<br></br>
					<ul>
						Caractéristiques:
						{char.map((cha) => (
							<li>{cha}</li>
						))}
					</ul>
					<br></br>
					<br></br>
					<ul>
						Solutions:
						{solutions.map((solution) => (
							<li>{solution}</li>
						))}
					</ul>
				</p>
			</>
		);
	};

	return (
		<div className="singleArticle">
			<div className="singleArticleWrapper">
				{prothese.photo && (
					<img src={PF + prothese.photo} alt="" className="singleArticleImg" />
				)}
				{updateMode ? (
					<input
						type="text"
						value={type}
						className="singleArticleTitleInput"
						autoFocus
						onChange={(e) => setType(e.target.value)}
					/>
				) : (
					<h1 className="singleArticleTitle">
						{type}
						{prothese.author === username && (
							<div className="singleArticleEdit">
								<i
									className="singleArticleIcon far fa-edit"
									onClick={() => setUpdateMode(true)}
								></i>
								<i
									className="singleArticleIcon far fa-trash-alt"
									onClick={handleDelete}
								></i>
							</div>
						)}
					</h1>
				)}
				<div className="singleArticleInfo">
					<span className="singleArticleAuthor">
						Author:
						<Link to={`/protheses?author=${prothese.author}`} className="link">
							<b> {prothese.author}</b>
						</Link>
					</span>
					<span className="singleArticleDate">
						{new Date(prothese.createdAt).toDateString()}
					</span>
				</div>
				{updateMode ? (
					<textarea
						className="singleArticleDescInput"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				) : (
					text(description, pros, cons, char, solutions)
				)}
				{updateMode && (
					<button className="singleArticleButton" onClick={handleUpdate}>
						Update
					</button>
				)}
				<Comments />
			</div>
		</div>
	);
};

export default SingleArticle;
