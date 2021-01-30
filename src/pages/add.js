import React from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { makeStyles, withStyles} from "@material-ui/core/styles";
import Header from '../components/header.js';
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        width: '100%',
        padding:'25px',
        [theme.breakpoints.down('md')]: {
            padding:'10px',
        },
    },
    linkText: {
        padding:0,
        textDecoration:'none',
        display: "flex",
        alignItems: "center",
        color: "#000"
    },
}));

function Add(props) {
  const classes = useStyles();
  const [name, setName] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  let oldLinks = JSON.parse(localStorage.getItem('linksArray')) || [];

  const changeName = (e) => {
    setName(e.target.value);
  };
  
  const changeUrl = (e) => {
    setUrl(e.target.value);
  };

  const addItem = () => {
    let newLinks = {
        'id': parseInt(Math.random() * 100000),
        'name': name,
        'url': url,
        'vote': 0,
    };
    oldLinks.push(newLinks);
    localStorage.setItem('linksArray', JSON.stringify(oldLinks));
    setSuccess(true);
  };

  function validateLinkedinUrl(value) {
    if(value !== '' && value !== null){
        let error;
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?');// query string
        error = !pattern.test(value) ? true : false;
        return error;
    }
    return false;
}

  return (
    <Grid container justify="center" className={classes.mainContainer}>
      <Header />
      <Grid xs={12} md={4}>
        <Grid item>
          <Typography variant="h6" style={{ width: "fit-content" }}>
            <Link to="/" className={classes.linkText}>
              <KeyboardBackspaceIcon style={{ marginRight: 5 }} /> Return to
              list
            </Link>
          </Typography>
        </Grid>
        <Grid item style={{ marginBottom: 30 }}>
          <Typography
            variant="h4"
            style={{ fontWeight: "bold", marginTop: 20 }}
          >
            Add New Link
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" style={{ marginBottom: 5 }}>
            Link Name:
          </Typography>
          <TextField
            variant="outlined"
            value={name}
            onChange={changeName}
            style={{ width: "100%" }}
          />
          <Typography
            variant="body1"
            style={{ marginBottom: 5, marginTop: 15 }}
          >
            Link Url:
          </Typography>
          <TextField
            variant="outlined"
            value={url}
            error={validateLinkedinUrl(url)}
            helperText={validateLinkedinUrl(url) ? 'Not a valid url' : ''}
            onChange={changeUrl}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid container justify="flex-end">
          <Button
            variant="containedPrimary"
            style={{
              marginTop: 25,
              borderRadius: "50px",
              padding: "10px 50px",
            }}
          >
            <Typography
              variant="h6"
              style={{ color: "#fff" }}
              onClick={addItem}
            >
              ADD
            </Typography>
          </Button>
        </Grid>
        <Snackbar
          onClose={() => setSuccess(false)}
          open={success}
        >
          <Alert severity="success">
            <strong>{name}</strong> added.
          </Alert>
        </Snackbar>
      </Grid>
    </Grid>
  );
}

export default withStyles({ withTheme: true })((Add));
