import React from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles} from "@material-ui/core/styles";
import Header from '../components/header.js';
import AddIcon from '@material-ui/icons/Add';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        width: '100%',
        padding:'25px',
        [theme.breakpoints.down('md')]: {
            padding:'10px',
        },
    },
    button:{
        height:90,
        width:100
    },
    linkGrid:{
        padding: 20,
        background: '#f7f7f7'
    },
    linkText: {
        padding:0,
        textDecoration:'none'
    },
    pointGrid: {
        padding:20,
        background: '#f7f7f7',
        border:'1px solid #e2e2e2',
        textAlign:'center',
        borderRadius:4
    }
}));

function List(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    order: '',
    name: 'hai',
  });
  const [links, setLinks] = React.useState(JSON.parse(localStorage.getItem('linksArray')) || []);

  const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: '#f7f7f7',
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <Grid container justify="center" className={classes.mainContainer}>
      <Header />
      <Grid xs={12} md={4}>
        <Grid
          container
          className={classes.linkGrid}
          justify="space-between"
          alignItems="center"
        >
          <Link to="/add" className={classes.linkText}>
            <Button variant="contained" className={classes.button}>
              <AddIcon style={{ fontSize: 50 }} />
            </Button>
          </Link>
          <Grid container xs justify="center">
            <Typography variant="h5">SUBMIT A LINK</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <hr
            size="1"
            style={{ border: "0.2px solid #f5f5f5", marginTop: 20 }}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <FormControl
            className={classes.formControl}
            style={{ width: "100%" }}
          >
            <InputLabel htmlFor="order">Order By</InputLabel>
            <Select
              native
              value={state.order}
              onChange={handleChange}
              input={<BootstrapInput />}
              inputProps={{
                name: "order",
                id: "order",
              }}
            >
              <option value=""></option>
              <option value={10}>Most Voted (Z -> A)</option>
              <option value={20}>Less Voted (A -> Z)</option>
            </Select>
          </FormControl>
        </Grid>
        {links &&
          links.map((link, index) => (
            <Grid container xs={12} style={{ marginTop: 20 }}>
              <Grid item className={classes.pointGrid}>
                <Typography variant="h5" style={{ fontWeight: "bold" }}>
                  {link.vote}
                </Typography>
                <Typography variant="body1">POINTS</Typography>
              </Grid>
              <Grid
                container
                xs
                alignItems="space-between"
                style={{ padding: "0 10px" }}
              >
                <Grid xs={12}>
                  <Typography variant="h6" style={{ fontWeight: "bold" }}>
                    {link.name}
                  </Typography>
                  <a
                    href={link.url}
                    rel="noreferrer"
                    target="_blank"
                    style={{ padding: 0, textDecoration: "none" }}
                  >
                    <Typography
                      variant="body1"
                      style={{ color: "rgb(181 181 181)" }}
                    >
                      ({link.url})
                    </Typography>
                  </a>
                </Grid>
                <Grid container justify="space-between" alignItems="flex-end">
                    <Grid item>
                        <Typography
                        variant="body1"
                        style={{ color: "rgb(181 181 181)", fontWeight:600, cursor:'pointer' }}
                        >
                            <ArrowUpwardIcon style={{marginBottom:-5}}/>
                        Up Vote
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography
                        variant="body1"
                        style={{ color: "rgb(181 181 181)", fontWeight:600, cursor:'pointer' }}
                        >
                            <ArrowDownwardIcon style={{marginBottom:-5}}/>
                        Down Vote
                        </Typography>
                    </Grid>
                </Grid>    
              </Grid>
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
}

export default withStyles({ withTheme: true })((List));
