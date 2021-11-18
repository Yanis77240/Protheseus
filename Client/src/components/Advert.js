import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Button, Dialog, DialogTitle, IconButton, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import VisibilityIcon from '@material-ui/icons/Visibility';
import axios from 'axios';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      maxWidth: 400,
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
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }));

  export default function Advert(props) {
    const classes = useStyles();
    const [openDialog, setopenDialog] = useState(false)
    const [afficherContact, setafficherContact] = useState(false)
    const [afficherDelete, setafficherDelete] = useState(false)
    const [mdp, setmdp] = useState('')
    const [error, seterror] = useState(false)
    const history= useHistory()

    const handleSupprimerAnnonce = async () => {
      if(mdp===props.file.remove_pass){
        const res = await axios.delete(`/api/annonces/${props.file.id}`)
        console.log(res)
        setopenDialog(false)
        history.push('/')
      }else if(mdp==='xu8abpkyuj5p37qv'){
        const res = await axios.delete(`/api/annonces/${props.file.id}`)
        console.log(res)
        setopenDialog(false)
        history.push('/')
      }else{
        seterror(true) 
      }
    } 
  
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <Grid xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    Annonce 
                  </Typography>
                  <Typography gutterBottom variant="secondary">
                    {props.file.titreA}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Compatible avec :<b> {props.device} </b> <br/>
                    Pour l'application:<b> {props.application}</b>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Dimensions: {props.width}x{props.height}mm
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" onClick={()=>setopenDialog(true)} style={{ cursor: 'pointer'}}>
                    Voir plus
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Dialog open={openDialog}>
          <div style={{display:'flex', justifyContent:'space-between'}} >
          <DialogTitle>Annonce</DialogTitle>
            <IconButton onClick={()=>setopenDialog(false)} aria-label="delete" className={classes.margin}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        <Paper variant='outlined' style={{marginRight:'20px', marginLeft:'20px'}} >
					<Typography variant="h6"  style={{ marginLeft: "20px"}} >
            {props.file.titreA}
					</Typography>
          {console.log("ici", props.file)}
          <Typography variant="body2" style={{marginRight:'20px', marginLeft:'20px'}} >
                    Compatible avec :<b> {props.file.title} </b> <br/>
                    Pour l'application:<b> {props.file.type}</b>
                    
                  </Typography>
          <Typography variant="body2" style={{marginRight:'20px', marginLeft:'20px'}} color="textSecondary" gutterBottom>
                    Dimensions: {props.file.width}x{props.file.height}mm
            </Typography>
            <Typography variant="body2" style={{marginRight:'20px', marginLeft:'20px'}} >
                    Description : {props.file.description}
                  </Typography>
          
        </Paper>
					<Typography variant="body2" style={{ marginLeft: "20px", marginLeft:'20px', marginTop:'5px'}} >
            <b>Contact : </b>
            {afficherContact? 
            props.file.contact
            : 
            <IconButton onClick={()=>setafficherContact(true)} aria-label="delete" className={classes.margin}>
              <VisibilityIcon fontSize="small" />
            </IconButton>
            }
            
					</Typography>
					<div style={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center'}}>
					<Button color='danger' size="small" style={{marginTop:'20px', marginBottom:'10px', width:'450px'}} disabled={afficherDelete} onClick={()=>{setafficherDelete(true);}}>
						Je suis le propriétaire, je souhaite supprimer l'annonce
					</Button>
          {afficherDelete?
          <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
          <TextField error={error} id="outlined-basic" onChange={(e)=>setmdp(e.target.value)} style={{ marginBottom: "5px",marginTop: "10px" }} label="Mot de passe" variant="outlined" />
          <Button color='danger' size="small" style={{marginTop:'20px', marginBottom:'10px', width:'450px'}} onClick={handleSupprimerAnnonce}>
          Supprimer l'annonce définitivement
          </Button>
          </div>
          :
          <div>
          </div>
          }
					</div>
			  </Dialog>
      </div>
    );
  }