import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="/">
				Protheseus
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

const SignUp = () => {
	const classes = useStyles();

	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleConfirmPasswordChange = (e) => {
		setConfirmPassword(e.target.value);
	};

	const handleClickShowConfirmPassword = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className={classes.image} />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<form className={classes.form} noValidate>
						<React.Fragment>
							<Grid container spacing={3}>
								<Grid item xs={12} sm={6}>
									<TextField
										required
										id="firstName"
										name="firstName"
										label="First name"
										fullWidth
										autoComplete="given-name"
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										required
										id="lastName"
										name="lastName"
										label="Last name"
										fullWidth
										autoComplete="family-name"
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										required
										id="email"
										name="email"
										label="Email"
										fullWidth
										autoComplete="email"
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										required
										id="password"
										name="password"
										label="Password"
										value={password}
										onChange={handlePasswordChange}
										type={showPassword ? "text" : "password"}
										fullWidth
										autoComplete="password"
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														aria-label="toggle password visibility"
														onClick={handleClickShowPassword}
														onMouseDown={handleMouseDownPassword}
													>
														{showPassword ? <Visibility /> : <VisibilityOff />}
													</IconButton>
												</InputAdornment>
											),
										}}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										required
										id="confirmPassword"
										name="confirmPassword"
										label="Confirm Password"
										type="password"
										fullWidth
										autoComplete="confirm-password"
										value={confirmPassword}
										onChange={handleConfirmPasswordChange}
										type={showConfirmPassword ? "text" : "password"}
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														aria-label="toggle password visibility"
														onClick={handleClickShowConfirmPassword}
														onMouseDown={handleMouseDownPassword}
													>
														{showPassword ? <Visibility /> : <VisibilityOff />}
													</IconButton>
												</InputAdornment>
											),
										}}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										required
										id="address"
										name="address"
										label="Address"
										fullWidth
										autoComplete="address"
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										required
										id="city"
										name="city"
										label="City"
										fullWidth
										autoComplete="shipping address-level2"
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										id="state"
										name="state"
										label="State/Province/Region"
										fullWidth
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										required
										id="zip"
										name="zip"
										label="Zip / Postal code"
										fullWidth
										autoComplete="shipping postal-code"
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										required
										id="country"
										name="country"
										label="Country"
										fullWidth
										autoComplete="shipping country"
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										required
										id="number"
										name="number"
										label="Number"
                                        type="text"
										fullWidth
										autoComplete="number"
									/>
								</Grid>
							</Grid>
						</React.Fragment>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Sign Up
						</Button>
						<Box mt={5}>
							<Copyright />
						</Box>
					</form>
				</div>
			</Grid>
		</Grid>
	);
};

export default SignUp;
