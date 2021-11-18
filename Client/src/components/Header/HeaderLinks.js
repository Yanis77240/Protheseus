/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import MailIcon from '@material-ui/icons/Mail';

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          href="/"
          color="transparent"
          className={classes.navLink}
        >
          <Link to='/'></Link>
          Choisir sa prothèse de main
          
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/"
          color="transparent"
          className={classes.navLink}
        >
          <Apps className={classes.icons} /> Types de Prothèse
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/deposer"
          color="transparent"
          className={classes.navLink}
        >
         Donnez votre avis
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/login"
          color="transparent"
          className={classes.navLink}
        >
         Se connecter
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <IconButton href="mailto:protheseus.pfe@gmail.com" aria-label="mail" className={classes.navLink}>
          <MailIcon fontSize="small" />
        </IconButton>
      </ListItem>
    </List>
  );
}
