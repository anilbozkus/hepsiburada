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
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Pagination from "@material-ui/lab/Pagination";

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
    },
    delete: {
      padding:10,
      background:'#e0e0e07a',
      borderRadius:4,
      transition:'0.3s',
      cursor:'pointer'

    },
    myDialog:{
      background:'#eae8e4'
    }
}));

function RemoveDialog(props) {
  const classes = useStyles();
  const { onClose, open, links, index, setLinks, page } = props;

  const removeLink = (index, page) => {
    links.splice(index + ((page-1)*5), 1)
    setLinks([...links])
    localStorage.setItem('linksArray', JSON.stringify(links.reverse()));
  };

  return (
    <Dialog style={{padding:20}} fullWidth={true} maxWidth="xs" classes={{ paper: classes.myDialog}} onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle style={{background:'#000', padding:'9px 15px', border:'0.6px solid #fff',marginBottom:30}} id="simple-dialog-title">
          <Typography variant="h6" style={{color:'#fff'}}>Remove Link</Typography>
        </DialogTitle>
        <Grid container justify="center" style={{marginBottom:50}} xs={12}>
          <Grid container justify="space-between" xs={9}>
            <Grid item xs={12} style={{textAlign:'center'}}>
              <Typography align="center" variant="h6" style={{color:'#777777'}}>Do you want to remove: </Typography>
              <Typography align="center" variant="h5" style={{fontWeight:'bold'}}>{links[index + ((page-1)*5)].name}</Typography>
            </Grid>
            <Grid container xs={12} spacing={2} style={{margin:0}}>
              <Grid item xs={12} md={6}>
                <Button style={{borderRadius: "50px", padding: "10px 50px",width:'100%',marginTop:20,fontWeight:'bold'}} onClick={() => removeLink(index, page)} variant="containedPrimary">OK</Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button style={{borderRadius: "50px", padding: "10px 50px",width:'100%',marginTop:20,fontWeight:'bold'}} onClick={() => {onClose(null)}} variant="containedPrimary">CANCEL</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
    </Dialog>
  );
}

function List(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    order: '',
    name: 'hai',
  });
  const [links, setLinks] = React.useState();
  const itemsPerPage = 5;
  const [page, setPage] = React.useState(1);
  const [noOfPages , setNoOfPages] = React.useState();

  
  React.useEffect(() => {
    if(!links){
      setLinks(JSON.parse(localStorage.getItem('linksArray')) && JSON.parse(localStorage.getItem('linksArray')).reverse() || [])
    }
    if(links){
      setNoOfPages(
        Math.ceil(links.length / itemsPerPage)
      );
    }
  },
  [links])

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
    if(event.target.value === 'most'){
      links.sort((a, b) => (a.vote < b.vote) ? 1 : -1)
      setLinks([...links])
    }
    else{
      links.sort((a, b) => (a.vote > b.vote) ? 1 : -1)
      setLinks([...links])
    }
  };

  const handlePage = (event, value) => {
    setPage(value);
  };

  const upVote = (index, page) => {
    links[index + ((page-1)*5)].vote = links[index + ((page-1)*5)].vote + 1
    links.sort((a, b) => (a.vote < b.vote) ? 1 : -1)
    setLinks([...links])
    localStorage.setItem('linksArray', JSON.stringify(links.reverse()));
  };

  const downVote = (index, page) => {
    if(links[index+ ((page-1)*5)].vote !== 0){
      links[index + ((page-1)*5)].vote = links[index + ((page-1)*5)].vote - 1
      links.sort((a, b) => (a.vote < b.vote) ? 1 : -1)
      setLinks([...links])
      localStorage.setItem('linksArray', JSON.stringify(links.reverse()));
    }
  };

  function LinkItem(props) {
    const { link, index } = props;
    const [deleteIcon, setDeleteIcon] = React.useState(false);
    const [remove, setRemove] = React.useState(false);

    return (
      <Grid
        onMouseEnter={() => setDeleteIcon(true)}
        onMouseLeave={() => setDeleteIcon(false)}
        className={deleteIcon ? classes.delete : ''}
        container
        xs={12}
        style={{ marginTop: 20 }}
      >
        <Grid item className={classes.pointGrid}>
          <Typography variant="h5" style={{ fontWeight: "bold" }}>
            {link.vote}
          </Typography>
          <Typography variant="body1">POINTS</Typography>
        </Grid>
        <Grid
          container
          xs={8}
          alignItems="space-between"
          style={{ padding: "0 10px" }}
        >
          <Grid xs={12}>
            <Grid container justify="space-between">
              <Typography variant="h6" style={{ fontWeight: "bold" }}>
                {link.name}
              </Typography>
              {deleteIcon && (
                <RemoveCircleIcon
                  onClick={() => setRemove(true)}
                  style={{ fontSize: 25, color: "#ff0000", cursor: "pointer" }}
                />
              )}
            </Grid>
            <RemoveDialog setLinks={setLinks} index={index} links={links} open={remove} page={page} onClose={() => setRemove(false)}/>
            <a
              href={link.url}
              rel="noreferrer"
              target="_blank"
              style={{ padding: 0, textDecoration: "none" }}
            >
              <Typography variant="body1" style={{ color: "rgb(181 181 181)" }}>
                ({link.url})
              </Typography>
            </a>
          </Grid>
          <Grid container justify="space-between" alignItems="flex-end">
            <Grid item onClick={() => upVote(index, page)}>
              <Typography
                variant="body1"
                style={{
                  color: "rgb(181 181 181)",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                <ArrowUpwardIcon style={{ marginBottom: -5 }} />
                Up Vote
              </Typography>
            </Grid>
            <Grid item onClick={() => downVote(index, page)}>
              <Typography
                variant="body1"
                style={{
                  color: "rgb(181 181 181)",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                <ArrowDownwardIcon style={{ marginBottom: -5 }} />
                Down Vote
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
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
              <option value={"most"}>Most Voted (Z from A)</option>
              <option value={"less"}>Less Voted (A from Z)</option>
            </Select>
          </FormControl>
        </Grid>
        {links &&
          links
            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map((link, index) => <LinkItem link={link} index={index} page={page} />)}
        <Pagination
          style={{margin:'20px 0'}}
          count={noOfPages}
          page={page}
          onChange={handlePage}
          defaultPage={1}
          color="primary"
          size="large"
          showFirstButton
          showLastButton
        />
      </Grid>
    </Grid>
  );
}

export default withStyles({ withTheme: true })((List));
