import React from "react";
import { useContext, useState } from "react";
import "./CreateProthese.css";
import axios from "axios";
import { Context } from "../../context/Context";

const CreateProthese = () => {
	const [type, setType] = useState("");
	const [description, setDescription] = useState("");
	const [file, setFile] = useState(null);
	const { user } = useContext(Context);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newProthese = {
			author: user.username,
			type,
			description,
		};
		if (file) {
			const data = new FormData();
			const filename = Date.now() + file.name;
			data.append("name", filename);
			data.append("file", file);
			newProthese.photo = filename;
			try {
				await axios.post("/upload", data);
			} catch (err) {}
		}
		try {
			const res = await axios.post("/protheses", newProthese);
			window.location.replace("/protheses/" + res.data._id);
		} catch (err) {}
	};
	return (
		<div className="create">
			{file && (
				<img className="createImg" src={URL.createObjectURL(file)} alt="" />
			)}
			<form className="createForm" onSubmit={handleSubmit}>
				<div className="createFormGroup">
					<label htmlFor="fileInput">
						<i className="createIcon fas fa-plus"></i>
					</label>
					<input
						type="file"
						id="fileInput"
						style={{ display: "none" }}
						onChange={(e) => setFile(e.target.files[0])}
					/>
					<input
						type="text"
						placeholder="Type"
						className="createInput"
						autoFocus={true}
						onChange={(e) => setType(e.target.value)}
					/>
				</div>
				<div className="createFormGroup">
					<textarea
						placeholder="Description..."
						type="text"
						className="createInput createText"
						onChange={(e) => setDescription(e.target.value)}
					></textarea>
				</div>
				<button className="createSubmit" type="submit">
					Publish
				</button>
			</form>
		</div>
	);
};
export default CreateProthese;
