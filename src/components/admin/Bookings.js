
import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
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

let Bookings=function(){
	let dispatch=useDispatch()
	let state=useSelector(s=>s)
	let {users,buses,bookings}=state
	const classes = useStyles();
	console.log(users,"users")
	console.log(buses,"buses")
	console.log(bookings,"bookings")
	
	const user_col=(ob,col) =>{
		if(users.some(x=>x._id===ob.userid))
		{
			let user=users.find(x=>x._id===ob.userid)
			return user[col]
		}
		else
		{
			return "na"
		}
	}

	const bus_col=(ob,col) =>{
		if(buses.some(x=>x._id===ob.busid))
		{
			let bus=buses.find(x=>x._id===ob.busid)
			return bus[col]
		}
		else
		{
			return "na"
		}
	}
	
	if(users.length && buses.length)
	{
		return <div>
			<h4 className="sub-title">Total bookings {bookings.length}</h4>
			
	<TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>S.No.</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Phone</StyledTableCell>
            <StyledTableCell align="right">Bus Title</StyledTableCell>
			<StyledTableCell align="right">Route</StyledTableCell>
			<StyledTableCell align="right">Time</StyledTableCell>
			
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((x) => (
            <StyledTableRow key={x._id}>
              <StyledTableCell component="th" scope="row">
                {x._id}
              </StyledTableCell>
              <StyledTableCell align="right">{user_col(x,"name")}</StyledTableCell>
              <StyledTableCell align="right">{user_col(x,"email")}</StyledTableCell>
              <StyledTableCell align="right">{user_col(x,"phone")}</StyledTableCell>
              <StyledTableCell align="right">{user_col(x,"bus_title")}</StyledTableCell>
			  <StyledTableCell align="right">{user_col(x,"bus_from")}-{bus_col(x,"bus_to")}</StyledTableCell>
			  <StyledTableCell align="right">{bus_col(x,"bus_starttime")}-{bus_col(x,"bus_endtime")}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
		</div>
	}
	else
	{
		return <h1>no users no buses no bookings</h1>
	}
}
export default Bookings;