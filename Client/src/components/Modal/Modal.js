import React from "react";
import "./Modal.css";

const Modal2 = ({ modalOpen, setModalOpen }) => {
	return (
		<div className="modal">
			<div onClick={() => setModalOpen(!modalOpen)} className="overlay"></div>
			<div className="modal-content">
				<div className="title">
					<h1>Not Logged In</h1>
				</div>
				<div className="body">
					<p>Veuillez vous connecter afin de pouvoir mettre un commentaire</p>
				</div>
				<div className="footer">
					<button onClick={() => setModalOpen(!modalOpen)} id="cancelBtn">
						Cancel
					</button>
					<button onClick={() => window.location.replace("/login")}>
						Me connecter
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal2;
