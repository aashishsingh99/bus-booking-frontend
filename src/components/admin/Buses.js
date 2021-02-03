// import React,{useEffect,useState} from 'react'
// import axios from 'axios'
// import {useSelector,useDispatch} from 'react-redux'

// function Buses() {

//     const dispatch=useDispatch()
//     const state=useSelector(s=>s)
//     const {buses}=state
//     console.log(buses)
//     const [ob,setob] = useState({ bus_title : "", 
//         bus_route : "", 
//         bus_starttime : "", 
//         bus_endtime : "", 
//         bus_hours : "", 
//         bus_from : "", 
//         bus_to : ""}) 

//     let [status, setstatus] = useState(false)

//     useEffect(function(){
//         console.log("state is ")
//         console.log(state)
//         axios.get("http://localhost:5000/buses")
//         .then(res=>res.data)
//         .then(res=>res.data)
//         .then(d=>{
            
//             dispatch({type: "buses", payload:d})
            
//         })
//         .catch(e=>alert("error "))
//     },[status])

//     const submit = (e) => {
//         e.preventDefault()
//         axios.post('http://localhost:5000/buses',ob)
//         .then(res => res.data)
//         .then(res =>res.data)
//         .then(d => setstatus(true))
//         .catch(e => alert(e.message))
//     }
//     return (
//         <div>
//             <form onSubmit = {submit} style={{"align-items":"center"}}>
//                 <h1>Total buses {buses.length}</h1>
//                 <table>
//                 <tbody>
// 					{Object.keys(ob).map(x=>
//                     <tr>
//                         <td>
//                             {x}
//                         </td>
//                         <td>
//                             <input 
//                             onChange={e=>setob({...ob,[x]:e.target.value})}
//                             value={ob[x]} 
//                             placeholder={"enter "+x}
//                             />
//                         </td>
//                     </tr>
//                 )}
// 				</tbody>
//                 </table>
//                 <button style={{"margin":"2% auto","padding":"2%","cursor":"pointer"}}>add bus </button>
//             </form>
            

//             <table cellPadding="10" border="1">
// 				<thead>
// 					<tr>
// 						<th>id</th>
// 						<th>Bus title</th>
					
// 						<th>Bus route</th>
// 						<th>Bus starttime</th>
// 						<th>Bus endtime</th>
// 						<th>Bus Hours</th>
// 						<th>Bus From</th>
// 						<th>Bus To</th>
						
// 					</tr>
// 				</thead>
// 				<tbody>
// 					{buses.map(x=>
// 						<tr>
// 							<td>{x._id}</td>
// 							<td>{x.bus_title}</td>
							
// 							<td>{x.bus_route}</td>
// 							<td>{x.bus_starttime}</td>
// 							<td>{x.bus_endtime}</td>
// 							<td>{x.bus_hours}</td>
// 							<td>{x.bus_from}</td>
// 							<td>{x.bus_to}</td>
							
// 						</tr>
// 					)}
// 				</tbody>
// 			</table>
//         </div>
//     )
// }

// export default Buses
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

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

  
  
function Buses() {
    const classes = useStyles();
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
        bus_to : ""}) 

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
        .catch(e => alert(e.message))
    }
    return (
        <div style={{"margin":"20px auto"}}>
            {/* <form onSubmit = {submit} style={{"align-items":"center"}}>
                <h1>Total buses {buses.length}</h1>
                <table>
                <tbody>
					{Object.keys(ob).map(x=>
                    <tr>
                        <td>
                            {x}
                        </td>
                        <td>
                            <input 
                            onChange={e=>setob({...ob,[x]:e.target.value})}
                            value={ob[x]} 
                            placeholder={"enter "+x}
                            />
                        </td>
                    </tr>
                )}
				</tbody>
                </table>
                <button style={{"margin":"2% auto","padding":"2%","cursor":"pointer"}}>add bus </button>
            </form>
            

            <table cellPadding="10" border="1">
				<thead>
					<tr>
						<th>id</th>
						<th>Bus title</th>
					
						<th>Bus route</th>
						<th>Bus starttime</th>
						<th>Bus endtime</th>
						<th>Bus Hours</th>
						<th>Bus From</th>
						<th>Bus To</th>
						
					</tr>
				</thead>
				<tbody>
					{buses.map(x=>
						<tr>
							<td>{x._id}</td>
							<td>{x.bus_title}</td>
							
							<td>{x.bus_route}</td>
							<td>{x.bus_starttime}</td>
							<td>{x.bus_endtime}</td>
							<td>{x.bus_hours}</td>
							<td>{x.bus_from}</td>
							<td>{x.bus_to}</td>
							
						</tr>
					)}
				</tbody>
			</table> */}
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New Bus</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill the details of the bus.
          </DialogContentText>
          <form>
          {Object.keys(ob).map(x=>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={x}
            type="email"
            onChange={e=>setob({...ob,[x]:e.target.value})}
            value={ob[x]}
            fullWidth
          />
          )}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submit} color="primary">
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

