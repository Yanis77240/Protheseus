import React, { useContext } from "react";
import { Context } from "context/Context";
import CommentForm from "components/CommentForm/CommentForm";
import "./Comment.css";

const Comment = ({
	comment,
	replies,
	setActiveComment,
	activeComment,
	updateComment,
	deleteComment,
	addComment,
	parentId = null,
}) => {
	const { user } = useContext(Context);
	const username = user ? user.user.username : null;
	const isEditing =
		activeComment &&
		activeComment.id === comment._id &&
		activeComment.type === "editing";
	const isReplying =
		activeComment &&
		activeComment.id === comment._id &&
		activeComment.type === "replying";
	const canDelete =
		username === comment.username && replies.length === 0;
	const canReply = Boolean(username);
	const canEdit = username === comment.username;
	const replyId = parentId ? parentId : comment._id;
	const createdAt = new Date(comment.createdAt).toLocaleDateString();
	return (
		<div key={comment._id} className="comment">
			<div className="comment-image-container">
				<img src="/user-icon.png" />
			</div>
			<div className="comment-right-part">
				<div className="comment-content">
					<div className="comment-author">{comment.username}</div>
					<div>{createdAt}</div>
				</div>
				{!isEditing && <div className="comment-text">{comment.body}</div>}
				{isEditing && (
					<CommentForm
						submitLabel="Update"
						hasCancelButton
						initialText={comment.body}
						handleSubmit={(text) => updateComment(text, comment._id)}
						handleCancel={() => {
							setActiveComment(null);
						}}
					/>
				)}
				<div className="comment-actions">
					{canReply && (
						<div
							className="comment-action"
							onClick={() =>
								setActiveComment({ id: comment._id, type: "replying" })
							}
						>
							Reply
						</div>
					)}
					{canEdit && (
						<div
							className="comment-action"
							onClick={() =>
								setActiveComment({ id: comment._id, type: "editing" })
							}
						>
							Edit
						</div>
					)}
					{canDelete && (
						<div
							className="comment-action"
							onClick={() => deleteComment(comment._id)}
						>
							Delete
						</div>
					)}
				</div>
				{isReplying && (
					<CommentForm
						submitLabel="Reply"
						handleSubmit={(text) => addComment(text, replyId)}
					/>
				)}
				{replies.length > 0 && (
					<div className="replies">
						{replies.map((reply) => (
							<Comment
								comment={reply}
								key={reply.id}
								setActiveComment={setActiveComment}
								activeComment={activeComment}
								updateComment={updateComment}
								deleteComment={deleteComment}
								addComment={addComment}
								parentId={comment.id}
								replies={[]}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Comment;
