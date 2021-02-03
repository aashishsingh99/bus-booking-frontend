import React, {useEffect, useState}  from 'react'
import axios from 'axios'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {useSelector,useDispatch} from 'react-redux'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
function PaperComponent(props) {
    return (
      <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
    );
  }
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));
function Seats(props) {
    const classes = useStyles();
    let dispatch = useDispatch()
    let state = useSelector(s=>s)
    let x = state.bus
    let [a,seta] = useState([])
    let [num, setnum] = useState(40)
    let [seatid, setseatid] = useState(0)
    let {bookings,buses,users} = state
    const [open, setOpen] = React.useState(false);
    const [opentoast, setOpenToast] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenToast(false);
  };
    if(!x._id)
    {
        props.history.push("/")
    }

    useEffect(function(){
        axios.post("http://localhost:5000/seat/info",{
            busid:x._id
        })
        .then(res=>res.data)
        .then(d=>{
            seta(d.data)
            setnum(new Array(num).fill(0).map((item,index)=>index+1))
        })
        .catch(e=>alert("error hai"))
    },[])
    const filled_or_not=seat_num=>{
		return bookings.some(x=>+x.seatid==+seat_num) 
	}

	let tr=new Array(11).fill(0).map((x,i) =>i).map(x=>x*4+1)
    const handleClick = () => {
        setOpenToast(true);
      };
	const bookNow=num=>{

		if(filled_or_not(num))
		{
            handleClick()
            
		}
		else
		{
			console.log(num,state.bookings)
			setseatid(num)
		}
	}
    const dobooking = e =>{
        const headers = {
            headers : {
                Authorization : `bearer ${state.token}`
            }
        }
        const myobj = {
            seatid,
            busid : x._id
        }
        axios.post("http://localhost:5000/book/seat",myobj,headers)
        .then(res =>{
            axios.get("http://localhost:5000/bookings")
            .then(res=>res.data.data)
            .then(res => dispatch({type:"bookings", payload:res}))
            handleClose()
        })
        .catch(e=>alert(e.message))
        
    }
    

    return (

        <div className = {classes.root}>
            <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Book Seat
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you really want to Book Seat No. {seatid} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={handleClose} >
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={dobooking} >
            Book
          </Button>
        </DialogActions>
      </Dialog>
            <div className = "card-bus">
                <div className = "card-heading">
            <h3> Bus selected is {x.bus_title}</h3>
                </div>
            <div className = "card-body">
            
            
            <h4>Boarding : </h4><p>{x.bus_from} at {x.bus_starttime}</p>
            <h4>Dropping : </h4><p>{x.bus_to} at {x.bus_endtime}</p>
            <h4>Name : </h4><p>{state.user}</p>

            
            

            </div>
            <div className = "card-footer">
            <h4>Total seats : 40</h4>
            {/* <h3>Available sets: {40-a.length}</h3> */}
            
            <button disabled = {!seatid} onClick = {handleClickOpen}>{
                seatid?"Book seat number :"+seatid:"please select a seat first"
            }</button>
            </div>
            {/* <h2>Bus seats</h2> */}
            </div>
            <Snackbar open={opentoast} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">This seat is already booked!
            </Alert>
            </Snackbar>
            <table className = "table-sm" cellPadding="5" cellSpacing="10">
			<tbody>
				{tr.slice(0,10).map((x,i) =>
					<tr key={i}>
						<td onClick={e=>bookNow(x+1)} bgcolor={filled_or_not(x+1)?"#696969":"white"}>{x+1}</td>
						<td onClick={e=>bookNow(x+0)} bgcolor={filled_or_not(x+0)?"#696969":"white"}>{x+0}</td>
						<td onClick={e=>bookNow(x+2)} bgcolor={filled_or_not(x+2)?"#696969":"white"}>{x+2}</td>
						<td onClick={e=>bookNow(x+3)} bgcolor={filled_or_not(x+3)?"#696969":"white"}>{x+3}</td>
					</tr>
				)}
			</tbody>
		</table>
            
        </div>
    )
}

export default Seats
