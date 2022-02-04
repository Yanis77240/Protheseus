/*eslint-disable*/
import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import MailIcon from "@material-ui/icons/Mail";

// @material-ui/icons
import { Apps } from "@material-ui/icons";

// core components
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
	const classes = useStyles();
	const { user, dispatch } = useContext(Context);
	const admin = user ? user.user.admin : null;
	const handleLogout = () => {
		dispatch({ type: "LOGOUT" });
	};

	return (
		<List className={classes.list}>
			<ListItem className={classes.listItem}>
				<Button href="/choose" color="transparent" className={classes.navLink}>
					Choisir sa prothèse de main
				</Button>
			</ListItem>
			<ListItem className={classes.listItem}>
				<Button
					href="/protheses"
					color="transparent"
					className={classes.navLink}
				>
					<Apps className={classes.icons} /> Types de Prothèse
				</Button>
			</ListItem>
			<ListItem className={classes.listItem}>
				<Button
					href="https://www.partage3d.fr/carte"
					target="_blank"
					rel="noopener noreferrer"
					color="transparent"
					className={classes.navLink}
				>
					Trouver une imprimante 3D
				</Button>
			</ListItem>
			{admin && (
				<ListItem className={classes.listItem}>
					<Button
						href="/create"
						color="transparent"
						className={classes.navLink}
					>
						Créer votre article
					</Button>
				</ListItem>
			)}
			{user ? (
				<ListItem className={classes.listItem}>
					<Button
						onClick={handleLogout}
						color="transparent"
						className={classes.navLink}
					>
						Se déconnecter
					</Button>
				</ListItem>
			) : (
				<ListItem className={classes.listItem}>
					<Button href="/login" color="transparent" className={classes.navLink}>
						Se connecter
					</Button>
				</ListItem>
			)}
			<ListItem className={classes.listItem}>
				<IconButton
					href="mailto:protheseus.pfe@gmail.com"
					aria-label="mail"
					className={classes.navLink}
				>
					<MailIcon fontSize="small" />
				</IconButton>
			</ListItem>
		</List>
	);
}
