import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import ReactPlayer from "react-player";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import styles2 from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import PageviewIcon from "@material-ui/icons/Pageview";
import CreateIcon from "@material-ui/icons/Create";
import ShareIcon from "@material-ui/icons/Share";

const useStyles = makeStyles(styles);
const useStyles2 = makeStyles(styles2);

export default function LandingPage(props) {
	const classes = useStyles();
	const classes2 = useStyles2();

	return (
		<div>
			<Header
				color="transparent"
				brand="Protheseus"
				rightLinks={<HeaderLinks />}
				fixed
				changeColorOnScroll={{
					height: 400,
					color: "white",
				}}
			/>
			<Parallax filter image={require("assets/img/bg7.jpg")}>
				<div className={classes.container}>
					<GridContainer>
						<GridItem xs={12} sm={12} md={6}>
							<h1 className={classes.title}>
								Choisir sa prothèse de main adaptée
							</h1>
							<h4>
								Protheseus permet de choisir au mieux sa prothèse de main grâce
								à un état de l'art poussé
							</h4>
							<br />
							<Button color="danger" size="lg" href="/creer">
								<i className="fas fa-play" />
								Choisir sa prothèse
							</Button>
						</GridItem>
					</GridContainer>
				</div>
			</Parallax>
			<div className={classNames(classes.main, classes.mainRaised)}>
				<div className={classes.container}>
					<div className={classes2.section}>
						<GridContainer justify="center">
							<GridItem xs={12} sm={12} md={8}>
								<h2 className={classes2.title}>Comment ça marche ?</h2>
								<h5 className={classes2.description}>
									Protheseus est une plateforme collaborative. Ici, vous pouvez
									rechercher et partager vos prothèses.
								</h5>
							</GridItem>
						</GridContainer>
						<div>
							<GridContainer>
								<GridItem xs={12} sm={12} md={4}>
									<InfoArea
										title="Recherchez"
										description="Le catalogue vous permet de parcourir les différentes prothèses existantes"
										icon={PageviewIcon}
										iconColor="info"
										vertical
									/>
								</GridItem>
								<GridItem xs={12} sm={12} md={4}>
									<InfoArea
										title="Partagez"
										description="Patagez vos avis sur les différentes prothèses existantes"
										icon={ShareIcon}
										iconColor="danger"
										vertical
									/>
								</GridItem>
								<div>salut </div>
							</GridContainer>
							<GridContainer justify="center" align="center" direction="column">
								<GridItem xs={12} sm={12} md={12}>
									<ReactPlayer
										url="https://www.youtube.com/watch?v=ekH3bje_2X4"
										controls={true}
									/>
								</GridItem>
							</GridContainer>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
