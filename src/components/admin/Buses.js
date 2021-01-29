import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'

function Buses() {

    const dispatch=useDispatch()
    const state=useSelector(s=>s)
    const {buses}=state
    console.log(buses)
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
        .catch(e => alert(e.message))
    }
    return (
        <div>
            <form onSubmit = {submit}>
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
                <button>add bus </button>
            </form>
            

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
							
						</tr>
					)}
				</tbody>
			</table>
        </div>
    )
}

export default Buses
