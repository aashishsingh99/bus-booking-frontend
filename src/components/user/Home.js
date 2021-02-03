import React from 'react'
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Draggable from 'react-draggable';
function PaperComponent(props) {
	return (
	  <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
		<Paper {...props} />
	  </Draggable>
	);
  }

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
  

let Home=function(props){
	const classes = useStyles();
	let dispatch=useDispatch()
	let state=useSelector(s=>s)
	const [open, setOpen] = React.useState(false);
	const [todel,settodel]=React.useState("")
  const handleClickOpen = (e,id) => {
	settodel(id);
	setOpen(true);
	
  };

  const handleClose = () => {
    setOpen(false);
  };

	React.useEffect(function(){
		if(state.buses.length==0)
		{
			props.history.push("/")
		}
		const headers={
			headers:{
				Authorization:`bearer ${state.token}`
			}
		}
		axios.get("http://localhost:5000/my/bookings",headers)
		.then(res=>{
			dispatch({type:"my booking",payload:res.data.data})


			console.log(state)
		})
		.catch(e=>alert(e.message))

		
	},[])



	const demo=id=>{
		console.log(state.buses.find(x=>x._id.toString()==id))
		return state.buses.find(x=>x._id.toString()==id)
	}

	

	const cancelNow=id =>{
		const headers={
					headers:{
						Authorization:`bearer ${state.token}`
					}
				}
				axios.post("http://localhost:5000/cancel/booking",{id},headers)
				.then(res=>{
					// dispatch({type:"my booking",payload:res.data.data})
					// console.log(res.data)
					dispatch({type:"my booking",payload:state.booking.filter(x=>x._id!=id)})
					dispatch({type:"bookings",payload:state.bookings.filter(x=>x._id!=id)})
					handleClose();
				})
				.catch(e=>alert(e.message))

				
	}
	

	return <div>
		
		
		<h5 className="sub-title">My total bookings {state.booking.length}</h5>
		
		<TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>sno</StyledTableCell>
			<StyledTableCell align="right">Bus </StyledTableCell>
            <StyledTableCell align="right">Route</StyledTableCell>
            <StyledTableCell align="right">Start-time</StyledTableCell>
            <StyledTableCell align="right">End-time</StyledTableCell>
            <StyledTableCell align="right">Duration</StyledTableCell>
			<StyledTableCell align="right">From</StyledTableCell>
			<StyledTableCell align="right">to</StyledTableCell>
			<StyledTableCell align="right">Cancel</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.booking.map((x) => (
            <StyledTableRow key={x._id}>
              <StyledTableCell component="th" scope="row">
                {x._id}
              </StyledTableCell>
              <StyledTableCell align="right">{demo(x.busid).bus_title}</StyledTableCell>
              <StyledTableCell align="right">{demo(x.busid).bus_route}</StyledTableCell>
              <StyledTableCell align="right">{demo(x.busid).bus_starttime}</StyledTableCell>
              <StyledTableCell align="right">{demo(x.busid).bus_endtime}</StyledTableCell>
			  <StyledTableCell align="right">{demo(x.busid).bus_hours}</StyledTableCell>
			  <StyledTableCell align="right">{demo(x.busid).bus_from}</StyledTableCell>
			  <StyledTableCell align="right">{demo(x.busid).bus_to}</StyledTableCell>
			  <StyledTableCell align="right"><Button variant="contained" color="secondary" onClick={(e)=>handleClickOpen(e,x._id)}>Cancel</Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
	<Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Cancel Booking
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure, you want to cancel the booking?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={e=>cancelNow(todel)}>
            Cancel 
          </Button>
          <Button variant="contained" color="primary" onClick={handleClose} >
            Close
          </Button>
        </DialogActions>
      </Dialog>
	</div>
}
export default Home;