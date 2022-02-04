import React from "react";
import { useState, useContext } from "react";
import "./CommentForm.css";
import { Context } from "context/Context";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

const CommentForm = ({
	handleSubmit,
	submitLabel,
	hasCancelButton = false,
	modalOpen,
	setModalOpen,
	handleCancel,
	initialText = "",
}) => {
	const { user } = useContext(Context);
	const [text, setText] = useState(initialText);
	const isTextareaDisabled = text.length === 0;

	const onSubmit = (event) => {
		event.preventDefault();
		if (user) {
			handleSubmit(text, null);
			setText("");
		} else {
			setModalOpen(!modalOpen);
		}
	};

	return (
		<form onSubmit={onSubmit}>
			<textarea
				className="comment-form-textarea"
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<button className="comment-form-button" disabled={isTextareaDisabled}>
				{submitLabel}
			</button>
			{hasCancelButton && (
				<button
					type="button"
					className="comment-form-button comment-form-cancel-button"
					onClick={handleCancel}
					disabled={isTextareaDisabled}
				>
					Cancel
				</button>
			)}
		</form>
	);
};

export default CommentForm;
