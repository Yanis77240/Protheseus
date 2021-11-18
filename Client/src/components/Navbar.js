import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	toolbar: {
		backgroundColor: "white",
		color: "black",
	},
	loginButton: {},
}));

export default function Navbar() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar className={classes.toolbar}>
					<IconButton
						href="/"
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
					>
						<div>Logo</div>
					</IconButton>
					<div style={{ flexGrow: 1 }}>
						<Button color="primary" href="/create">
							Créer une prothèse
						</Button>
						<Button color="primary" href="/">
							A propos
						</Button>
						<Button color="primary" href="/catalogue">
							Catalogue
						</Button>
						<Button color="primary" href="/annonces">
							3D test
						</Button>
					</div>
					<Button color="inherit" href="/login" className={classes.loginButton}>
						Se connecter
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
}
