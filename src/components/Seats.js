import React, {useEffect, useState}  from 'react'
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'

function Seats(props) {
    let dispatch = useDispatch()
    let state = useSelector(s=>s)
    let x = state.bus
    let [a,seta] = useState([])
    let [num, setnum] = useState(40)
    let [sid, setsid] = useState(0)
    let {bookings,buses,users} = state

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
		return bookings.some(x=>+x.sid===+seat_num) 
	}

	let tr=new Array(11).fill(0).map((x,i) =>i).map(x=>x*4+1)

	const bookNow=num=>{

		if(filled_or_not(num))
		{
			alert("already booked by someone")
		}
		else
		{
			console.log(num,state.bookings)
			setsid(num)
		}
	}
    const dobooking = e =>{
        const headers = {
            headers : {
                Authorization : `bearer ${state.token}`
            }
        }
        const myobj = {
            sid,
            bid : x._id
        }
        axios.post("http://localhost:5000/book/seat",myobj,headers)
        .then(res =>{
            axios.get("http://localhost:5000/bookings")
            .then(res=>res.data.data)
            .then(res => dispatch({type:"bookings", payload:res}))
        })
        .catch(e=>alert(e.message))
        
    }
    

    return (
        <div>
            <h1> Bus selected is {x.bus_title}</h1>

            <ol>
                <li>{x._id}</li>
                <li>{x.bus_title}</li>
                
                <li>{x.bus_route}</li>
                <li>{x.bus_starttime}</li>
                <li>{x.bus_endtime}</li>
                <li>{x.bus_hours}</li>
                <li>{x.bus_from}</li>
                <li>{x.bus_to}</li>

            </ol>
            <h2>Total seats : 40</h2>
            <h3>Available sets: {40-a.length}</h3>
            <button disabled = {!sid} onClick = {dobooking}>{
                sid?"Book seat number :"+sid:"please select a seat first"
            }</button>
            <h2>bus seat</h2>
            <table border="1" cellPadding="10" cellSpacing="10">
			<tbody>
				{tr.slice(0,10).map((x,i) =>
					<tr key={i}>
						<td onClick={e=>bookNow(x+0)} bgcolor={filled_or_not(x+0)?"tomato":"lime"}>{x+0}</td>
						<td onClick={e=>bookNow(x+1)} bgcolor={filled_or_not(x+1)?"tomato":"lime"}>{x+1}</td>
						<td onClick={e=>bookNow(x+2)} bgcolor={filled_or_not(x+2)?"tomato":"lime"}>{x+2}</td>
						<td onClick={e=>bookNow(x+3)} bgcolor={filled_or_not(x+3)?"tomato":"lime"}>{x+3}</td>
					</tr>
				)}
			</tbody>
		</table>
            
        </div>
    )
}

export default Seats
