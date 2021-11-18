import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import "./Create.css";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import UndoIcon from '@material-ui/icons/Undo';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import done from '../../assets/img/done.gif'
import { useHistory } from "react-router-dom";
import axios from "axios";
import uuid from 'react-uuid'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import help from '../../assets/img/help.png'
import { Checkbox, FormControlLabel, Icon, Popover } from "@material-ui/core";

const useStyles = makeStyles({
	formCard: {
		width: "40vw",
		maxWidth: "400px",
		minWidth: "350px",
		height: '80vh',
		overflowY:'auto'
	},
	ObjectsCard: {
		width: "20vw",
		maxWidth: "400px",
		minWidth: "200px",
	},
	margin: {
		marginTop: "10px",
	},
	marginA: {
		marginTop: "2px",
	},
	paperCreate: {
		display: "flex",
		justifyContent: "center",
		flexDirection: "column",
		marginTop: "20px"
	},
	paperCases: {
		display: "flex",
		justifyContent: "center",
		flexDirection: "column",
		overflowY:'auto',
		marginTop: "10px"
	},
	Typo: {},
	button: {
		margin: "10px",
	},
});

const Modify = ({location}) => {
	let history = useHistory();
	const classes = useStyles(styles);
	const [switchAvance, setSwitchAvance] = useState(false);
	const [svgSize, setsvgSize] = useState({width:location.state.file.width, height:location.state.file.height})
	const [svgCreated, setsvgCreated] = useState(false)
	const [caseProperties, setcaseProperties] = useState({height:0, width:0, x:0, y:0})
	const [modify, setModify] = useState(false)
	const [lastCaseID, setlastCaseID] = useState(0)
	const [lastAction, setlastAction] = useState({action:'', id:'', prop:{}})
	const [fileToSave, setfileToSave] = useState({title:'',device:'',application: '', height:'', width:'', trimmed:[]})
	const [caract, setcaract] = useState({device:'', application: ''})
	const [returnPossible, setreturnPossible] = useState(false)
	const [openDialog, setopenDialog] = useState(false)
	const [openHelp, setopenHelp] = useState(false)
	const id = openHelp ? 'simple-popover' : undefined;

    useEffect(() => {
        HandleCreateSVG()
		console.log('file',location.state.file)
        location.state.file.trimmed.forEach((value, index)=>{
			console.log('value',value)
            HandleCreateCase(value.x,value.y,value.width,value.height,true,true)
        })
        setSwitchAvance(true)
        
    },[])

	const options = CAAObjects.map((option) => {
		const application = option.title.toUpperCase();
		return {
			firstLetter: application,
			...option,
		};
	});

	const HandleCreateSVG = () => {
		var containerElement = document.getElementById('svg_container');

		// variable for the namespace 
		const svgns = "http://www.w3.org/2000/svg";

		// make a simple rectangle
		let svg = document.createElementNS(svgns, "svg");

		svg.setAttribute("width", `${svgSize.width}mm`);
		svg.setAttribute("height", `${svgSize.height}mm`);
		svg.setAttribute("id", "svg_element");
		//console.log(svg)
		// append the new rectangle to the svg
		containerElement.appendChild(svg);
		setsvgCreated(true)
		HandleCreateCase(0,0,svgSize.width,svgSize.height, false, false)
	}

	const handleReturn = () => {
		if(lastAction.action==='create'){
			document.getElementById(lastAction.id).remove()
		}
		if(lastAction.action==='remove'){
			//console.log(lastAction)
			HandleCreateCase(lastAction.prop.x,lastAction.prop.y,lastAction.prop.width,lastAction.prop.height, true, true)
		}
		if(lastAction.action==='modify'){
			
			setlastCaseID(lastAction.id)
			console.log(lastCaseID, 'after')
			HandleModifierlaCase(lastAction.prop.x,lastAction.prop.y,lastAction.prop.width,lastAction.prop.height)
		}
		setreturnPossible(false)
	}

	const SaveToBdd = async() => {
		const allRect= document.getElementsByClassName('rect_container');
		const width = document.getElementsByClassName('rect_container').item(0).width.animVal.valueInSpecifiedUnits
		const height = document.getElementsByClassName('rect_container').item(0).height.animVal.valueInSpecifiedUnits
		let trimmed = []
		for(let i=1;i<allRect.length;i++){
			
			trimmed.push({
				height: document.getElementsByClassName('rect_container').item(i).height.animVal.valueInSpecifiedUnits,
				width: document.getElementsByClassName('rect_container').item(i).width.animVal.valueInSpecifiedUnits,
				x: document.getElementsByClassName('rect_container').item(i).x.animVal.valueInSpecifiedUnits,
				y: document.getElementsByClassName('rect_container').item(i).y.animVal.valueInSpecifiedUnits
			})
		}
		const dataToSave={title:'', device: caract.device, application: caract.application, height: height, width: width , trimmed: trimmed }
		const res = await axios.post('/api/files', dataToSave)
		console.log(res)
	}

	const HandleTelecharger = () => {
		removeAllCross()
		var svgElement = document.getElementById('svg_element');
		var s = new XMLSerializer().serializeToString(svgElement)
		var encodedData = window.btoa(s);
		console.log('data:image/svg+xml;base64,'+encodedData)

		var a = document.createElement("a"); //Create <a>
		a.href = "data:image/svg+xml;base64," + encodedData; //Image Base64 Goes here
		a.download = "Image.svg"; //File name Here
		a.click(); //Downloaded file
		
		let {width, height} = svgElement.getBBox(); 
		let clonedSvgElement = svgElement.cloneNode(true);
		let outerHTML = clonedSvgElement.outerHTML;

		const blob = new Blob([outerHTML],{type:'image/svg+xml;charset=utf-8'});
		//let URL = window.URL || window.webkitURL || window;
		let blobURL = window.URL.createObjectURL(blob);
		let image = new Image();
		image.onload = () => {
		
			let canvas = document.createElement('canvas');
			
			canvas.widht = width;
			
			canvas.height = height;
			let context = canvas.getContext('2d');
			// draw image in canvas starting left-0 , top - 0  
			context.drawImage(image, 0, 0, width, height );
			//  downloadImage(canvas); need to implement
		};
		image.src = blobURL;
		console.log(blobURL)
		
		setopenDialog(true)
	}

	const HandleCreateCase = (x,y,width,height, crossBoolean, modifyBoolean) => {
		const svgns = "http://www.w3.org/2000/svg";
		const svg = document.getElementById("svg_element");
		let svg1 = document.createElementNS(svgns, "svg");
		svg1.setAttribute("x", `${x}mm`)
		svg1.setAttribute("y", `${y}mm`)
		svg1.setAttribute("width",  `${width}mm`)
		svg1.setAttribute("height", `${height}mm`)
		svg1.setAttribute("id", uuid());
		svg1.setAttribute("class", "rect_container");
		

		svg.appendChild(svg1)
		// variable for the namespace 
		
		// make a simple rectangle
		let newRect = document.createElementNS(svgns, "rect");
		newRect.setAttribute("x", '0');
		newRect.setAttribute("y", '0');
		newRect.setAttribute("width", `${width}mm`);
		newRect.setAttribute("height", `${height}mm`);
		newRect.setAttribute("fill", "transparent");
		newRect.setAttribute("stroke", "red");
		newRect.setAttribute("strokeWidth", "2");
		
		// append the new rectangle to the svg
		svg1.appendChild(newRect);
		setcaseProperties({height:0, width:0, x:0, y:0})
		if(crossBoolean){
			HandleCreateRemoveCross(x,y,width,height,svg1.id)
		}
		if(modifyBoolean){
			HandleCreateModifyIcon(x,y,width,height,svg1.id)
		}
		setlastAction({action:'create', id:svg1.id})
		return(svg1.id)
	}

	const removeAllCross = () => {
		for(let i=document.getElementsByClassName('svg_cross_container').length-1; i>-1; i--){
			document.getElementsByClassName('svg_cross_container').item(i).remove()
		}
	}

	const HandleCreateRemoveCross= (x,y,width,height, caseID) => {
		var containerElement = document.getElementById(caseID);
		console.log(caseID)
		// variable for the namespace 
		const svgns = "http://www.w3.org/2000/svg";

		let svg1 = document.createElementNS(svgns, "svg");
		svg1.setAttribute("x", `${parseInt(width)-5}mm`)
		svg1.setAttribute("y", `${0}mm`)
		svg1.setAttribute("class", "svg_cross_container");
		let node=document.getElementById(caseID)
		svg1.setAttribute("onclick",`document.getElementById(${caseID}).remove()`)
		svg1.addEventListener('click', function (event) {
			//document.getElementById(caseID).remove()
			setlastAction({action:'remove',prop:{x:x,y:y,width:width,heigth:height}})
		  });
		svg1.setAttribute("width", `5mm`)
		svg1.setAttribute("height", `5mm`)
		containerElement.appendChild(svg1)

		let newRect = document.createElementNS(svgns, "rect");
		newRect.setAttribute("x", `0`);
		newRect.setAttribute("y", `0`);
		newRect.setAttribute("width", `5mm`);
		newRect.setAttribute("height", `5mm`);
		newRect.setAttribute("fill", "transparent");
		newRect.setAttribute("stroke", "transparent");
		newRect.setAttribute("strokeWidth", "2");
		newRect.setAttribute("class", "svg_cross");
		newRect.setAttribute("onclick",`document.getElementById(${caseID}).remove()`)
		svg1.appendChild(newRect);
		
		let svg = document.createElementNS(svgns, "svg");
		svg.setAttribute("x", `1mm`)
		svg.setAttribute("y", `1mm`)
		svg.setAttribute("width", `3mm`)
		svg.setAttribute("height", `3mm`)
		svg.setAttribute("viewBox","0 0 329.26933 329")
		

		svg1.appendChild(svg)
		let cross = document.createElementNS(svgns, "path")
		cross.setAttribute("d", "m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0")
		svg.appendChild(cross);
	}

	const HandleCreateModifyIcon= (x,y,width,height, caseID) => {
		var containerElement = document.getElementById(caseID);

		// variable for the namespace 
		const svgns = "http://www.w3.org/2000/svg";

		let svg1 = document.createElementNS(svgns, "svg");
		svg1.setAttribute("x", `${parseInt(width)-11}mm`)
		svg1.setAttribute("y", `${0}mm`)
		svg1.setAttribute("class", "svg_cross_container");
		
		//svg1.setAttribute("onclick",`${() => HandleModify(caseID)}`)
		svg1.addEventListener('click', function (event) {
			HandleModify(caseID)
		  });
		svg1.setAttribute("width", `5mm`)
		svg1.setAttribute("height", `5mm`)
		containerElement.appendChild(svg1)

		let newRect = document.createElementNS(svgns, "rect");
		newRect.setAttribute("x", `0`);
		newRect.setAttribute("y", `0`);
		newRect.setAttribute("width", `5mm`);
		newRect.setAttribute("height", `5mm`);
		newRect.setAttribute("fill", "transparent");
		newRect.setAttribute("stroke", "transparent");
		newRect.setAttribute("strokeWidth", "2");
		newRect.setAttribute("class", "svg_cross");
		//newRect.setAttribute("onclick",`${() => HandleModify(caseID)}`)
		svg1.appendChild(newRect);
		
		let svg = document.createElementNS(svgns, "svg");
		svg.setAttribute("x", `1mm`)
		svg.setAttribute("y", `1mm`)
		svg.setAttribute("width", `3mm`)
		svg.setAttribute("height", `3mm`)
		svg.setAttribute("viewBox","-15 -15 484.00019 484")
		

		svg1.appendChild(svg)
		let cross = document.createElementNS(svgns, "path")
		cross.setAttribute("d", "m401.648438 18.234375c-24.394532-24.351563-63.898438-24.351563-88.292969 0l-22.101563 22.222656-235.269531 235.144531-.5.503907c-.121094.121093-.121094.25-.25.25-.25.375-.625.746093-.871094 1.121093 0 .125-.128906.125-.128906.25-.25.375-.371094.625-.625 1-.121094.125-.121094.246094-.246094.375-.125.375-.25.625-.378906 1 0 .121094-.121094.121094-.121094.25l-52.199219 156.96875c-1.53125 4.46875-.367187 9.417969 2.996094 12.734376 2.363282 2.332031 5.550782 3.636718 8.867188 3.625 1.355468-.023438 2.699218-.234376 3.996094-.625l156.847656-52.324219c.121094 0 .121094 0 .25-.121094.394531-.117187.773437-.285156 1.121094-.503906.097656-.011719.183593-.054688.253906-.121094.371094-.25.871094-.503906 1.246094-.753906.371093-.246094.75-.621094 1.125-.871094.125-.128906.246093-.128906.246093-.25.128907-.125.378907-.246094.503907-.5l257.371093-257.371094c24.351563-24.394531 24.351563-63.898437 0-88.289062zm-232.273438 353.148437-86.914062-86.910156 217.535156-217.535156 86.914062 86.910156zm-99.15625-63.808593 75.929688 75.925781-114.015626 37.960938zm347.664062-184.820313-13.238281 13.363282-86.917969-86.917969 13.367188-13.359375c14.621094-14.609375 38.320312-14.609375 52.945312 0l33.964844 33.964844c14.511719 14.6875 14.457032 38.332031-.121094 52.949218zm0 0")
		svg.appendChild(cross);
	}


	function HandleModify(caseID) {
		let svg=document.getElementById(caseID)
		setcaseProperties({x:parseInt(svg.x.animVal.valueInSpecifiedUnits),y:parseInt(svg.y.animVal.valueInSpecifiedUnits), height:parseInt(svg.height.animVal.valueInSpecifiedUnits), width:parseInt(svg.width.animVal.valueInSpecifiedUnits)})
		setModify(true)
		setlastCaseID(caseID)
	}

	const HandleModifierlaCase=(x,y,width,height) => {
		document.getElementById(lastCaseID).remove()
		const idNEW= HandleCreateCase(x,y,width,height,true,true)
		setModify(false)
		setlastAction({action:'modify',id:idNEW,prop:caseProperties })
		setcaseProperties({x:0,y:0, height:0, width:0})
	}

	return (
		<div >
			
			<Header
				color="black"
				brand="Fin'Guide"
				rightLinks={<HeaderLinks />}
				fixed
			/>
			<div style={{ display: 'flex', height: '100%', marginTop: '8vh' }}>
				<div className={"createCard"}>
					<Fade in={true} timeout={{ enter: 900 }}>
						<Card className={classes.formCard} elevation={5}>
							<CardContent>
								
							{/*
							<Typography variant="h6"  style={{ marginTop: "10px" }}>
								Rechercher un fichier existant
							</Typography>
						
							<Autocomplete
								id="grouped-demo"
								options={options.sort(
									(a, b) => -b.firstLetter.localeCompare(a.firstLetter)
								)}
								groupBy={(option) => option.firstLetter}
								getOptionLabel={(option) => option.type}
								className={classes.margin}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Aplication de CAA"
										variant="outlined"
									/>
								)}
							/>
								*/}
							<Typography variant="h6"  style={{ marginTop: "5px"}} gutterBottom>
									Modifier un guide doigts
							</Typography>
							<div style={{display:'flex',flexDirection:'row', alignItems:'flex-start', marginBottom: "5px",marginTop: "10px"}}>
								<div>
									<TextField id="outlined-basic" value={location.state.file.title} disabled={true}  style={{  marginRight:'5px' }} label="Modèle de tablette" variant="outlined" />
								</div>
								<div>
									<TextField id="outlined-basic" value={location.state.file.type} disabled={true} style={{marginLeft:'5px', minWidth:'220px'  }} label="Application de CAA et Grille" variant="outlined" />
								</div>
							</div>
							
							

								<Typography color="textSecondary" style={{ marginTop: "10px" }}>
									Dimensions de la tablette
							</Typography>
								<Grid container spacing={3}>
									<Grid item xs={5} style={{ paddingRight:'0px'}}>
										<FormControl
											fullWidth
											className={classes.margin}
											variant="outlined"
											disabled={svgCreated}
										>
											<InputLabel htmlFor="outlined-adornment-amount" type="number">
												Hauteur
										</InputLabel>
											<OutlinedInput
                                                value={location.state.file.height}
												type='number'
												onChange={(e)=>{setsvgSize({height:e.target.value, widht:svgSize.width});}}
												inputProps={{ min: 0} }
												//value={values.weight}
												//onChange={handleChange('weight')}
												endAdornment={
													<InputAdornment position="end">mm</InputAdornment>
												}
												labelWidth={60}
											/>
										</FormControl>
									</Grid>
									<Grid item xs={5} style={{ paddingRight:'0px'}}>
										<FormControl
											fullWidth
											className={classes.margin}
											variant="outlined"
											disabled={svgCreated}
										>
											<InputLabel htmlFor="outlined-adornment-amount">
												Largeur
										</InputLabel>
											<OutlinedInput
                                                value={location.state.file.width}
												type='number'
												inputProps={{ min: 0} }
												onChange={(e)=>{setsvgSize({height:svgSize.height, width:e.target.value});}}
												//value={values.weight}
												//onChange={handleChange('weight')}
												endAdornment={
													<InputAdornment position="end">mm</InputAdornment>
												}
												labelWidth={60}
											/>
										</FormControl>
									</Grid>
									<Grid item xs={2} style={{ display:'flex', justifyContent:"flex-start", marginRight:'-10px' }} >
									
										<IconButton disabled={svgCreated} stylearia-label="delete" edge='false' size='small' color='primary' onClick={()=>{setSwitchAvance(true); HandleCreateSVG()}}>
											<ArrowForwardIosIcon fontSize="medium" />
										</IconButton>
									</Grid>

									
								</Grid>
								
							

								<Paper
									variant="outlined"
									label="yo"
									className={classes.paperCreate}
								>
									<div className={"formA"}>
										<Typography color="textSecondary">
											Dimensions de la case
											<IconButton aria-describedby={id} variant="contained" color="primary" onClick={(e)=>setopenHelp(e.currentTarget)}>
												<HelpOutlineIcon fontSize="small" />
											</IconButton>
									<Popover
										id={id}
										open={openHelp}
										anchorEl={openHelp}
										onClose={()=>setopenHelp(false)}
										anchorOrigin={{
										vertical: 'bottom',
										horizontal: 'center',
										}}
										transformOrigin={{
										vertical: 'top',
										horizontal: 'center',
										}}
									>	
										<img class="fit-picture"
											src={help}
											alt="helper"/>
										<Typography align='justify' style={{width:'255px', marginLeft:'5px'}} className={classes.typography}>Nous recommandons 2mm d'espacement entre chaque case.</Typography>
									</Popover>
									</Typography>

										<Grid container spacing={3}>
											<Grid item xs={6}>
												<FormControl
													fullWidth
													className={classes.marginA}
													variant="outlined"
												>
													<InputLabel htmlFor="outlined-adornment-amount">
														Hauteur
												</InputLabel>
													<OutlinedInput
														type='number'
														inputProps={{ min: 0} }
														
														disabled={!switchAvance}
														value={caseProperties.height ? parseInt(caseProperties.height) : ''}
														onChange={(e)=>setcaseProperties({...caseProperties, height: e.target.value})}
														endAdornment={
															<InputAdornment position="end">mm</InputAdornment>
														}
														labelWidth={60}
													/>
												</FormControl>
											</Grid>
											<Grid item xs={6}>
												<FormControl
													fullWidth
													className={classes.marginA}
													variant="outlined"
												>
													<InputLabel htmlFor="outlined-adornment-amount">
														Largeur
												</InputLabel>
													<OutlinedInput
														type='number'
														inputProps={{ min: 0} }
														disabled={!switchAvance}

														value={caseProperties.width ? parseInt(caseProperties.width) : ''}
														onChange={(e)=>setcaseProperties({...caseProperties, width: e.target.value})}
														endAdornment={
															<InputAdornment position="end">mm</InputAdornment>
														}
														labelWidth={60}
													/>
												</FormControl>
											</Grid>
										</Grid>
									</div>
									<div className={"formA"}>
										<Typography color="textSecondary">
											Position de la case
									</Typography>

										<Grid container spacing={3}>
											<Grid item xs={6}>
												<FormControl
													fullWidth
													className={classes.marginA}
													variant="outlined"
												>
													<InputLabel htmlFor="outlined-adornment-amount">
														x
												</InputLabel>
													<OutlinedInput
														type='number'
														inputProps={{ min: 0} }
														disabled={!switchAvance}

														value={caseProperties.x ? parseInt(caseProperties.x) : ''}
														onChange={(e)=>setcaseProperties({...caseProperties, x: e.target.value})}
														endAdornment={
															<InputAdornment position="end">mm</InputAdornment>
														}
														labelWidth={60}
													/>
												</FormControl>
											</Grid>
											<Grid item xs={6}>
												<FormControl
													fullWidth
													className={classes.marginA}
													variant="outlined"
												>
													<InputLabel htmlFor="outlined-adornment-amount">
														y
												</InputLabel>
													<OutlinedInput
														type='number'
														inputProps={{ min: 0} }
														disabled={!switchAvance}

														value={caseProperties.y ? parseInt(caseProperties.y) : ''}
														onChange={(e)=>setcaseProperties({...caseProperties, y: e.target.value})}
														endAdornment={
															<InputAdornment position="end">mm</InputAdornment>
														}
														labelWidth={60}
													/>
												</FormControl>
											</Grid>
										</Grid>
									</div>
									{modify? 
									
										<Button
										disabled={!switchAvance}
										onClick={()=>{HandleModifierlaCase(caseProperties.x,caseProperties.y,caseProperties.width,caseProperties.height); setreturnPossible(true)}}
										variant="contained"
										color="secondary"
										size="large"
										className={classes.button}
										startIcon={<AddIcon />}
									>
										Modifier la case
										</Button>

										:
										
										<Button
										disabled={!switchAvance}
										onClick={()=>{HandleCreateCase(caseProperties.x,caseProperties.y,caseProperties.width,caseProperties.height, true, true); setreturnPossible(true)}}
										variant="contained"
										color="primary"
										size="large"
										className={classes.button}
										startIcon={<AddIcon />}
									>
										Ajouter une case
										</Button>
									}
									
								</Paper>
								<div
									label="yo"
									className={classes.paperCases}
								>
									<div className={"formA"}>
										<Typography color="textSecondary">
											
							</Typography>


									</div>
									<Button
										disabled={!switchAvance}
										variant="contained"
										color="primary"
										size="large"
										startIcon={<SaveAltIcon />}
										onClick={HandleTelecharger}
									>
										Télécharger
								</Button>

								</div>




							</CardContent>
						</Card>

					</Fade>
				</div>
				<div style={{marginTop: '5vh'}} >
				{/*<IconButton aria-label="undo" disabled={!returnPossible} className={classes.margin}>
					<UndoIcon fontSize="large" onClick={handleReturn}  />
								</IconButton>*/}
				<div id='svg_container' style={{marginLeft: '1%', marginRight: '5px', height: '70vh', width: '100%' }}>
					{/*<svg id='svg_element'
						version="1.1"
						width="500" 
						height="500"
						baseProfile="full"
						xmlns="http://www.w3.org/2000/svg">

						<rect width="400px" height="400px" stroke="red" fill="transparent" strokeWidth="5" />

						<circle cx="150" cy="100" r="80" fill="green" />

						<text x="150" y="125" font-size="60" text-anchor="middle" fill="white">SVG</text>

						</svg>*/}
														
					

				</div>
				</div>
			</div>
			<Dialog open={openDialog}>
				<DialogTitle>Votre fichier a été créé avec succès !</DialogTitle>
				<div>
				<img src={done} width="500px" height="200px" style={{objectFit:'contain',marginTop: '-20px'}}></img>
				</div>
					<Typography variant="h6"  style={{ marginLeft: "20px"}} gutterBottom>
						Et maintenant, que faire avec mon fichier ?	 
					</Typography>
					<Typography variant="body1"  align='justify' style={{ marginLeft: "20px", marginTop:'10px', width:'460px'}} gutterBottom>
					Rendez-vous dans un FabLab équipé d'une découpeuse Laser muni de votre fichier sur clé USB.
					La découpe Laser d'un guide doigts prend en moyenne 5 minutes et le prix horaire moyen constaté est de 75€ /h.
					Si vous ne trouvez pas de FabLab, rendez-vous sur <a href="https://www.partage3d.fr/">Partage3D.fr</a> qui propose un partage collaboratif de matériel. Recherchez une machine CNC, puis laissez vous guider. 
					</Typography>
					<div style={{display:'flex', justifyContent:'center'}}>
					<Button color='primary' variant="contained" style={{marginTop:'20px', marginBottom:'10px', width:'120px'}} onClick={()=>{setopenDialog(false); history.push('/')}}>
						Compris !
					</Button>
					</div>
			</Dialog>
		</div>
	);
};

// Temp
const CAAObjects = [
	{ title: "Samsung Galaxy tab S7", type: "Snap Core First 2x4" },
	{ title: "Samsung Galaxy tab S7", type: "Snap Core First 3x4" },
	{ title: "microsoft surface go", type: "Snap Core First 4x5" },
	{ title: "Ipad 7", type: "Snap Core First 2x6" },
	{ title: "microsoft surface go", type: "Grid 3 2x4" },
	{ title: "Ipad 7", type: "Grid 3 4x4" },
	{ title: "Ipad 6", type: "Grid 3 6x4" },
	{ title: "Samsung Galaxy tab S7", type: "Communicator 5 2x5" },
	{ title: "Ipad 6", type: "Communicator 5 5x5" },
];

export default Modify;