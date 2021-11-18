/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { IconButton, List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MailIcon from '@material-ui/icons/Mail';

// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import styles from "assets/jss/material-kit-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
            <IconButton href="mailto:protheseus.pfe@gmail.com" aria-label="mail" className={classes.navLink}>
              <MailIcon fontSize="small" />
            </IconButton>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://www.lahanditech.fr/"
                className={classes.block}
                target="_blank"
              >
                Handitech
              </a>
            </ListItem>
          </List>
        </div>
        <div className={classes.right}>
          &copy; {1900 + new Date().getYear()} Protheseus
          
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool
};
