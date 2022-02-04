import React from "react";
import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import CommentForm from "components/CommentForm/CommentForm";
import Comment from "components/Comment/Comment";
import "./Comments.css";
import { Context } from "context/Context";
import Modal from "components/Modal/Modal";

const Comments = () => {
	const location = useLocation();
	const path = location.pathname.split("/")[2];
	const { user } = useContext(Context);
	const [modalOpen, setModalOpen] = useState(false);
	const [backendComments, setBackendComments] = useState([]);
	const [activeComment, setActiveComment] = useState(null);
	const rootComments = backendComments.filter(
		(backendComment) => backendComment.parentId === null
	);

	if (modalOpen) {
		document.body.classList.add("active-modal");
	} else {
		document.body.classList.remove("active-modal");
	}

	const getReplies = (commentId) =>
		backendComments
			.filter((backendComment) => backendComment.parentId === commentId)
			.sort(
				(a, b) =>
					new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
			);

	const addComment = async (text, parentId) => {
		console.log(user.user.username);
		const newComment = {
			body: text,
			username: user.user.username,
			parentId,
			protheseId: path,
		};
		console.log(newComment);
		await axios.post("/comments", newComment);
		setActiveComment(null);
	};

	const updateComment = async (text, commentId) => {
		if (user) {
			const updatedComment = {
				body: text,
				username: user.user.username,
			};
			await axios.put(`/comments/${commentId}`, updatedComment);
			setActiveComment(null);
		}
	};

	const deleteComment = async (commentId) => {
		if (window.confirm("Are you sure you want to remove comment?")) {
			if (user) {
				await axios.delete(`/comments/${commentId}`, {
					data: { username: user.user.username },
				});
			}
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get(`/comments?protheseId=${path}`);
			setBackendComments(result.data);
		};
		fetchData();
	}, [addComment]);

	return (
		<div className="comments">
			<h3 className="comments-title">Commentaires</h3>
			<div className="comment-form-title">Write comment</div>
			<CommentForm
				handleSubmit={addComment}
				submitLabel="Write"
				modalOpen={modalOpen}
				setModalOpen={setModalOpen}
			/>
			<div className="comments-container">
				{rootComments.map((rootComment) => (
					<Comment
						key={rootComment._id}
						comment={rootComment}
						replies={getReplies(rootComment._id)}
						activeComment={activeComment}
						setActiveComment={setActiveComment}
						addComment={addComment}
						deleteComment={deleteComment}
						updateComment={updateComment}
					/>
				))}
			</div>
			{modalOpen && <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} />}
		</div>
	);
};

export default Comments;
