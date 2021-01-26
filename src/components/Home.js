import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'

function Buses() {

    let dispatch=useDispatch()
	let state=useSelector(s=>s)
    let {buses}=state
    
    const setSingleBus = x => {
        dispatch({type: "setSingleBus", payload: x})
    }

    const [ob,setob] = useState({ bus_title : "", 
        bus_route : "", 
        bus_starttime : "", 
        bus_endtime : "", 
        bus_hours : "", 
        bus_from : "", 
        bus_to : ""}) 

    const [status, setstatus] = useState(false)

    useEffect(function(){
        axios.get("http://localhost:5000/buses")
        .then(res=>res.data)
        .then(res=>res.data)
        .then(d=>{
            dispatch({type: "buses", payload:d})
        })
        .catch(e=>alert(e.msg))
    },[status])

    const submit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/buses',ob)
        .then(res => res.data)
        .then(res =>res.data)
        .then(d => setstatus(true))
        .catch(e => alert(e.message))
    }
    return (
        <div>
            

            <table cellPadding="10" border="1">
				<thead>
					<tr>
						<th>id</th>
						<th>bus_title</th>
					
						<th>bus_route</th>
						<th>bus_starttime</th>
						<th>bus_endtime</th>
						<th>b_hours</th>
						<th>b_from</th>
						<th>b_to</th>
						
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
							<td>
							<Link onClick={e=>setSingleBus(x)} to="/seats">view seats</Link>
						    </td>
						</tr>
					)}
				</tbody>
			</table>
        </div>
    )
}

export default Buses
