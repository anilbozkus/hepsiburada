import React from 'react';
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Logo from '../static/images/logo.jpg';
function Header(props) {
  return (
        <Grid container justify="space-between">
            <img src={Logo} alt="logo" style={{width:'300px', objectFit:'contain',marginTop:-50}}/> 
        </Grid>
  );
}

export default withStyles({ withTheme: true })((Header));
