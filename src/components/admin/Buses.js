
import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PhotoIcon from '@material-ui/icons/Photo';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.info.dark,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

  const useStylesForm = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '10ch',
      },
    },
  }));
  
function Buses() {
    const classes = useStyles();
    const classes1 = useStylesForm();
    const dispatch=useDispatch()
    const state=useSelector(s=>s)
    const {buses}=state
    console.log(buses)
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const [ob,setob] = useState({ bus_title : "", 
        bus_route : "", 
        bus_starttime : "", 
        bus_endtime : "", 
        bus_hours : "", 
        bus_from : "", 
        bus_to : "",
        photo:""}) 

    let [status, setstatus] = useState(false)

    useEffect(function(){
        console.log("state is ")
        console.log(state)
        axios.get("http://localhost:5000/buses")
        .then(res=>res.data)
        .then(res=>res.data)
        .then(d=>{
            
            dispatch({type: "buses", payload:d})
            
        })
        .catch(e=>alert("error "))
    },[status])

    const submit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/buses',ob)
        .then(res => res.data)
        .then(res =>res.data)
        .then(d => setstatus(true))
        handleClose()
        // .catch(e => alert(e.message))
    }
    return (
        <div style={{"margin":"20px auto"}}>
            
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New Bus</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill the details of the bus.
          </DialogContentText>
          <form className={classes1.root}>
          
          <DirectionsBusIcon></DirectionsBusIcon><TextField InputProps={{ disableUnderline: true }} autoFocus  margin="dense" placeholder="Bus Name" value={ob.bus_title} onChange={e=>setob({...ob,bus_title:e.target.value})}/>
          <LocationOnIcon></LocationOnIcon><TextField InputProps={{ disableUnderline: true }} autoFocus  margin="dense" placeholder="Route" value={ob.bus_route} onChange={e=>setob({...ob,bus_route:e.target.value})}/>
          <AccessAlarmsIcon></AccessAlarmsIcon><TextField InputProps={{ disableUnderline: true }} autoFocus  margin="dense" placeholder="Board Time" value={ob.bus_starttime} onChange={e=>setob({...ob,bus_starttime:e.target.value})}/>
          
          <AccessAlarmsIcon></AccessAlarmsIcon><TextField InputProps={{ disableUnderline: true }} autoFocus  margin="dense" placeholder="Arrival Time" value={ob.bus_endtime} onChange={e=>setob({...ob,bus_endtime:e.target.value})}/>
          
          
          <LocationOnIcon></LocationOnIcon><TextField InputProps={{ disableUnderline: true }} autoFocus  margin="dense" placeholder="Boarding" value={ob.bus_from} onChange={e=>setob({...ob,bus_from:e.target.value})}/>
          <LocationOnIcon></LocationOnIcon><TextField InputProps={{ disableUnderline: true }} autoFocus  margin="dense" placeholder="Arrival" value={ob.bus_to} onChange={e=>setob({...ob,bus_to:e.target.value})}/>
          <AccessAlarmsIcon></AccessAlarmsIcon><TextField InputProps={{ disableUnderline: true }} autoFocus  margin="dense" placeholder="Duration" value={ob.bus_hours} onChange={e=>setob({...ob,bus_hours:e.target.value})}/>
          <PhotoIcon></PhotoIcon><TextField InputProps={{ disableUnderline: true }} autoFocus  margin="dense" placeholder="Photo" value={ob.photo} onChange={e=>setob({...ob,photo:e.target.value})}/>
          </form>
        </DialogContent>
        <DialogActions>
        
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={submit} >
            Add Bus
          </Button>
        </DialogActions>
      </Dialog>
            <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Bus Id</StyledTableCell>
            <StyledTableCell align="right">Bus Title</StyledTableCell>
            <StyledTableCell align="right">Bus Route</StyledTableCell>
            <StyledTableCell align="right">Bus Start-time</StyledTableCell>
            <StyledTableCell align="right">Bus end-time</StyledTableCell>
            <StyledTableCell align="right">Duration</StyledTableCell>
            <StyledTableCell align="right">Departure</StyledTableCell>
            <StyledTableCell align="right">Arrival</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {buses.map((x) => (
            <StyledTableRow key={x._id}>
              <StyledTableCell component="th" scope="row">
                {x._id}
              </StyledTableCell>
              <StyledTableCell align="right">{x.bus_title}</StyledTableCell>
              <StyledTableCell align="right">{x.bus_route}</StyledTableCell>
              
              <StyledTableCell align="right">{x.bus_starttime}</StyledTableCell>
              <StyledTableCell align="right">{x.bus_endtime}</StyledTableCell>
              <StyledTableCell align="right">{x.bus_hours}</StyledTableCell>
              <StyledTableCell align="right">{x.bus_from}</StyledTableCell>
              <StyledTableCell align="right">{x.bus_to}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Button onClick = {handleClickOpen} style={{"margin":"20px 50%"}}variant="contained" color="primary">
        Add 
      </Button>
        </div>
    )
}

export default Buses

