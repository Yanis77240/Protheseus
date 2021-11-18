import React, {useEffect, useState} from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import './Catalogue.css'
import Advert from "components/Advert"
import Model from "components/Model"
import Grid from '@material-ui/core/Grid';
import SendIcon from "@material-ui/icons/Send";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import Header from "components/Header/Header.js";
import Parallax from "components/Parallax/Parallax.js";
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from "@material-ui/core/Typography";
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Pagination from '@material-ui/lab/Pagination'
import axios from "axios";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {

  const [CAAData, setCAAData] = useState([])
  const [data, setdata] = useState([])
  const [displayCata, setdisplayCata] = useState(false)
  const [firstPageGrid, setfirstPageGrid] = useState(1)
  const [checkBoxs, setCheckBoxs] = useState({
    checkedAnnonces: true,
    checkedFichiers: true
  });

  const init=async()=>{
    let temp=[]
    if(checkBoxs.checkedFichiers){
      const res= await axios.get('/api/files')
      console.log(res)
      res.data.forEach((value,index)=>{
          temp=CAAData
          temp.push({model:'fichier', title: value.device, type: value.application, height: value.height, width: value.width, date: value.updatedAt, trimmed: value.trimmed })
        })
    }
    if(checkBoxs.checkedAnnonces){
      const res2= await axios.get('/api/annonces')
      console.log(res2)
      res2.data.forEach((value,index)=>{
        temp=CAAData
        temp.push({models:'annonce', titreA:value.title, title: value.device, type: value.application, height: value.height, width: value.width, date: value.updatedAt, contact: value.contact, remove_pass: value.remove_pass, description: value.description, id:value._id })
      })
    }
    setCAAData(temp);
    setdata(temp)
    const promise1 = new Promise((resolve, reject) => {
        resolve('foo');
    })
    return promise1
  }
  const salut = async()=>{
    await init()
    setdisplayCata(true)
  }
  
  useEffect(() => {
    salut()
   
  }, [checkBoxs])
  

  
  // Temp
const CAAObjects = [
    { title: "Samsung Galaxy tab S7", type: "Snap Core First 2x4", sh:'filou' },
    { title: "Samsung Galaxy tab S7", type: "Snap Core First 3x4", sh:'filou' },
    { title: "microsoft surface go", type: "Snap Core First 4x5", sh:'filou' },
    { title: "Ipad 7", type: "Snap Core First 2x6" , sh:'filou'},
    { title: "microsoft surface go", type: "Grid 3 2x4" , sh:'filou'},
    { title: "Ipad 7", type: "Grid 3 4x4" , sh:'filou'},
    { title: "Ipad 6", type: "Grid 3 6x4" , sh:'filou'},
    { title: "Samsung galaxy tab S7", type: "Communicator 5 2x5" , sh:'filou'},
    { title: "Ipad 6", type: "Communicator 5 5x5" , sh:'filou'},
  ];
  
  

  const handleChange = async(event) => {
    setCAAData([])
    setdisplayCata(false)
    setCheckBoxs({ ...checkBoxs, [event.target.name]: event.target.checked });
  };
  
  const affichageGrid = (page) => {
    var returnObject = []
    if(displayCata){
      if(CAAData.length){
        for(let index=(page-1)*9; index<9*page; index++){
          if(CAAData[index]){
            let value=CAAData[index]
            if(value.model==='fichier'){
              returnObject.push(
                <Grid item xs={4}>
                  <Model device={value.title} application={value.type} height={value.height} width={value.width} file={value} />
                </Grid>
              )
            }else{
              returnObject.push(
                <Grid item xs={4}>
                  <Advert device={value.title} application={value.type} height={value.height} width={value.width} file={value} />
                </Grid>
              )
            }
            
        }
      }
      return returnObject
      }else{
        return <div style={{width:'100%', justifyContent:'center', display:'flex'}}><Typography  style={{marginTop:'40px'}} >Pas de résultats</Typography></div>
      }
      
      
    }else{
      return  <div style={{marginTop:'40px',width:'100%', justifyContent:'center', display:'flex'}}> <CircularProgress/></div>
  }
}

  const classes = useStyles();

  return (
    <div>
      <Header
        color="transparent"
        brand="Fin'Guide"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 100,
          color: "white",
        }}
      />
      <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div style={{display:'flex', padding:'2%'}}>
          <div style={{flex:'3'}}>
            <Paper elevation={0} variant="outlined" style={{background:'#F1F1F1', padding:'10px'}}>
             
            <Typography variant="h6"  style={{ marginTop: "10px" }}>
                Filtrer
							</Typography>
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                onChange={(e)=>{e.target.getAttribute('data-option-index') ? setCAAData([CAAData[e.target.getAttribute('data-option-index')]]) : setCAAData(data)}}
                options={[...new Set(CAAData.map(item => item.title.toUpperCase()))]}
                renderInput={(params) => (
                  <TextField {...params} onChange={(e)=>{console.log(e.target.value)}} label="Rechercher un appareil" placeholder='Ex : Samsung Galaxy Tab A7' margin="normal" variant="outlined" />
                )}
              />
              <FormGroup row>
                <FormControlLabel
                  control={<Checkbox color="primary" checked={checkBoxs.checkedAnnonces} onChange={handleChange} name="checkedAnnonces" />}
                  label="Annonces"
                  style={{color:'black'}}
                />
                <FormControlLabel
                  control={<Checkbox color="primary" checked={checkBoxs.checkedFichiers} onChange={handleChange} name="checkedFichiers" />}
                  label="Fichiers"
                  style={{color:'black'}}
                />
         </FormGroup>
             
            </Paper>
            </div>
            <div style={{display:'flex', flex:'9', marginLeft:'10px', flexDirection:'column', alignItems:'center', width:'100%'}}>
              <GridContainer style={{ width:'100%'}} >
                <GridItem>
                  <Grid direction='row-reverse' container className="container" spacing={3}>
                    {affichageGrid(firstPageGrid)}
                  </Grid>
                </GridItem>
              </GridContainer>
              {CAAData.length?
              <Pagination style={{marginTop:'20px'}} count={Math.ceil((CAAData.length)/9)} onChange={(e,value)=>setfirstPageGrid(value)} shape="rounded" />
              :
              <div></div>
            }
              
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
