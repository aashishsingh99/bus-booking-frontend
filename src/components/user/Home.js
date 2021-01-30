import React from 'react'
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'

let Home=function(props){
	let dispatch=useDispatch()
	let state=useSelector(s=>s)
	

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
				})
				.catch(e=>alert(e.message))

				
	}

	return <div>
		<h1>user home page</h1>
		<h2>My total bookings {state.booking.length}</h2>
		<table>
			<thead>
				<tr>
					<th>sno</th>
					<th>bus</th>
					<th>Route</th>
					<th>Start-time</th>
					<th>End-time</th>
					<th>Hours</th>
					<th>From</th>
					<th>To</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{state.booking.map(x=>
					<tr key={x._id}>
						<td>{x._id}</td>
						<td>{demo(x.busid).bus_title}</td>
						
						<td>{demo(x.busid).bus_route}</td>
						<td>{demo(x.busid).bus_starttime}</td>
						<td>{demo(x.busid).bus_endtime}</td>
						<td>{demo(x.busid).bus_hours}</td>
						<td>{demo(x.busid).bus_from}</td>
						<td>{demo(x.busid).bus_to}</td>
						
						<td>
							<button onClick={e=>cancelNow(x._id)}>cancel now</button>
						</td>
					</tr>
					
				)}
			</tbody>
		</table>
	</div>
}
export default Home;