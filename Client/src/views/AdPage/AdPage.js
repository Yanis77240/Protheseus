import React from "react";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import "./AdPage.css";
import axios from "axios";

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="/">
				Fin'Guide
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100vh",
	},
	image: {
		backgroundImage: "url(https://source.unsplash.com/random)",
		backgroundRepeat: "no-repeat",
		backgroundColor:
			theme.palette.type === "light"
				? theme.palette.grey[50]
				: theme.palette.grey[900],
		backgroundSize: "cover",
		backgroundPosition: "center",
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const Login = () => {
	const classes = useStyles();
	const history = useHistory();
	const [title, setTitle] = useState("");
	const [device, setDevice] = useState("");
    const [application, setApplication] = useState("");
	const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
	const [description, setDescription] = useState("");
	

	const handleChange = (e) => {
		setTitle(e.target.value);
	};

	const handleDeviceChange = (e) => {
		setDevice(e.target.value);
	};

    const handleApplicationChange = (e) => {
		setApplication(e.target.value);
	};

	const handleWidthChange = (e) => {
		setWidth(e.target.value);
	};

    const handleHeightChange = (e) => {
		setHeight(e.target.value);
	};

	const handleDescriptionChange = (e) => {
		setDescription(e.target.value);
	};

	const onSubmit = async () => {
		const { data: annonce } = await axios.post(`/api/annonces`, {
			title,
			device,
            application,
            width,
            height,
            description
		});
		history.push("/");
	};

	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className={classes.image} />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<AccessibleForwardIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Poster une Annonce
					</Typography>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="title"
						label="Titre"
                        type="text"
						name="title"
						autoComplete="title"
						autoFocus
						value={title}
						onChange={handleChange}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="device"
						label="Appareil"
						type="text"
						id="device"
						autoComplete="device"
						value={device}
						onChange={handleDeviceChange}
					/>
                    <TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="application"
						label="application"
						type="text"
						id="application"
						autoComplete="application"
						value={application}
						onChange={handleApplicationChange}
					/>
                    <TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="width"
						label="Longeur"
						type="text"
						id="width"
						autoComplete="width"
						value={width}
						onChange={handleWidthChange}
					/>
                    <TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="height"
						label="Largeur"
						type="text"
						id="height"
						autoComplete="height"
						value={height}
						onChange={handleHeightChange}
					/>
                    <TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="description"
						label="description"
						type="text"
						id="description"
						autoComplete="description"
						value={description}
						onChange={handleDescriptionChange}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						endIcon={<SendIcon />}
						className={classes.submit}
						onClick={onSubmit}
					>
						Poster ton annonce
					</Button>
				</div>
			</Grid>
		</Grid>
	);
};

export default Login;