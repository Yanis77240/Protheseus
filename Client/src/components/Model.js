import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      maxWidth: 400,
    },
    image: {
      width: 100,
      height: 100,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }));

  export default function Model(props) {
    const classes = useStyles();
    const history=useHistory()
  
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    Fichier Guide Doigts
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Compatible avec : <b>{props.device}</b> <br/>
                    Conçu pour l'application: <b>{props.application}</b>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Dimensions: {props.width}x{props.height}mm
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" 
                  onClick={()=>{history.push({
                      pathname: '/modifier',
                      state: { file: props.file }
                        })}} 
                    style={{ cursor: 'pointer'}}>
                    Voir plus
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }