import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
	return (
		<div className="sidebar">
			<div className="sidebarItem">
				<span className="sidebarTitle">ABOUT US</span>
				<img className="sidebarImg" src="/sidebar_logo.jpg" alt="" />
				<p>
					Nous sommes un groupe d'étudiants de l'ECE Paris avec un objectif
					commun, rendre l'accès aux prothèses de main facile, rapide et à coût
					réduit.
				</p>
			</div>
			<div className="sidebarItem">
				<span className="sidebarTitle">Authors</span>
				<ul className="sidebarList">
					<li className="sidebarListItem">
						<Link to="/protheses?author=Pierre-Louis" className="link">
							Pierre-Louis
						</Link>
					</li>
					<li className="sidebarListItem">
						<Link to="/protheses?author=Romain" className="link">
							Romain
						</Link>
					</li>
					<li className="sidebarListItem">
						<Link to="/protheses?author=Jules" className="link">
							Jules
						</Link>
					</li>
					<li className="sidebarListItem">
						<Link to="/protheses?author=Yanis" className="link">
							Yanis
						</Link>
					</li>
					<li className="sidebarListItem">
						<Link to="/protheses?author=Louis" className="link">
							Louis
						</Link>
					</li>
					<li className="sidebarListItem">
						<Link to="/protheses?author=Arthur" className="link">
							Arthur
						</Link>
					</li>
				</ul>
			</div>
			<div className="sidebarItem">
				<span className="sidebarTitle">FOLLOW US</span>
				<div className="sidebarSocial">
					<i className="sidebarIcon fab fa-facebook-square"></i>
					<i className="sidebarIcon fab fa-instagram-square"></i>
					<i className="sidebarIcon fab fa-pinterest-square"></i>
					<i className="sidebarIcon fab fa-twitter-square"></i>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
