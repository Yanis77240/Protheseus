import React, {useState} from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import Header from "components/Header/Header.js";
import Parallax from "components/Parallax/Parallax.js";
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { Dialog, DialogTitle, FormControl, Icon, InputAdornment, InputLabel, OutlinedInput } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(styles);

export default function AddAnnonce(props) {
    let history = useHistory()
    const [openDialog, setopenDialog] = useState(false)
    const classes = useStyles();
    const [form, setform] = useState({title:'', device:'', application:'', height:'', width:'', description:'', contact:'' , remove_pass:''})
    const [passEqual, setpassEqual] = useState(false)
    const [error, seterror] = useState({title: false, device: false, application: false, height: false, width: false, description: false, contact: false , remove: false})

    const handleDeposer = async() => {
        setpassEqual(false)
        const res = await axios.post('/api/annonces', form)
        console.log(res)
        setopenDialog(false); 
        history.push('/');
    }

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
        <div style={{ padding: "40px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h6">Donnez votre avis</Typography>{" "}
          </div>

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <TextField
                id="outlined-basic"
                label="Titre de l'avis"
                variant="outlined"
                onChange={(e)=>setform({...form, title: e.target.value})}
              />
              <TextField
                id="outlined-basic"
                style={{ marginTop: "10px", minWidth: "300px" }}
                label="Type de prothèse"
                variant="outlined"
                onChange={(e)=>setform({...form, device: e.target.value})}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "10px",
                justifyContent:'space-between',
                minWidth:'300px'
              }}
            >
                <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={10}
                variant="outlined"
                onChange={(e)=>setform({...form, description: e.target.value})}
                />
                <TextField
                id="outlined-multiline-static"
                label="Contact (Téléphone, Email,...)"
                multiline
                rows={2}
                style={{marginTop:'10px'}}
                variant="outlined"
                onChange={(e)=>setform({...form, contact: e.target.value})}
                error={error.contact}
                />
            </div>
            
          </div>
          <div style={{display:'flex', justifyContent:'center', marginTop:'50px', minWidth:'200px'}}>
                <Button
                    onClick={()=>setopenDialog(true)}
                    variant="contained"
                    color="danger"
                    className={classes.button}
                    style={{minWidth:'200px'}}
                    endIcon={<Icon>send</Icon>}
                    disabled={form.title==''||form.device==''||form.application==''||form.height==''||form.width==''||form.description==''||form.contact==''}
                >
                    Donnez votre avis
                </Button> 
            </div>
        </div>
      </div>
      
        <Dialog open={openDialog}>
            <DialogTitle>Saissez un mot de passe de suppression</DialogTitle>
            <Typography variant="body1"  align='justify' style={{ margin: "20px", marginTop:'10px', width:'460px'}} gutterBottom>
                Si une personne est intéressée par votre avis, elle vous contactera. 
                <br/>Afin d'ultérieurement supprimer votre avis, veuillez saisir un mot de passe (à conserver) : 
            </Typography>
            <div style={{display:'flex', justifyContent:'center'}}>
            <div style={{display:'flex', justifyContent:'center', flexDirection:'column'}}>
            <TextField
                type='password'
                id="mdp"
                label="Mot de passe"
                onChange={(e)=>setform({...form, remove_pass: e.target.value})}
                variant="outlined"
                style={{width:'220px'}}
                />
                <TextField
                id="mdpConf"
                type='password'
                label="Confirmez le mot de passe"
                error={!passEqual}
                onChange={(e)=>setpassEqual(e.target.value==form.remove_pass)}
                style={{marginTop:'10px',width:'220px'}}
                variant="outlined"
                />
            </div>
            </div>
            <div style={{display:'flex', justifyContent:'center'}}>
            <Button color='danger' variant="contained" disabled={!passEqual} style={{marginTop:'30px', marginBottom:'10px', width:'200px'}} onClick={handleDeposer}>
                Donnez votre avis
            </Button>
            </div>
        </Dialog>
      <Footer />
    </div>
  );
}
