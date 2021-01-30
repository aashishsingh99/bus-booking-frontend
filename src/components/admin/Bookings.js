
import React from 'react'
import {useSelector,useDispatch} from 'react-redux'

let Bookings=function(){
	let dispatch=useDispatch()
	let state=useSelector(s=>s)
	let {users,buses,bookings}=state

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
			<h1>all bookings {bookings.length}</h1>
			<table >
				<thead>
					<tr>
						<th>sno</th>
						<th>name</th>
						<th>email</th>
						<th>phone</th>
						<th>title</th>
						
						<th>route</th>
						<th>time</th>
						
					</tr>
				</thead>
				<tbody>
					{bookings.map(x=>
						<tr key={x._id}>
							<td>{x._id}</td>
							<td>{user_col(x,"name")}</td>
							<td>{user_col(x,"email")}</td>
							<td>{user_col(x,"phone")}</td>
							<td>{bus_col(x,"bus_title")}</td>
							<td>{bus_col(x,"bus_from")} - {bus_col(x,"bus_to")}</td>
							<td>{bus_col(x,"bus_starttime")} - {bus_col(x,"bus_endtime")}</td>
                            
							
						</tr>
						
					)}
				</tbody>
			</table>
		</div>
	}
	else
	{
		return <h1>no users no buses no bookings</h1>
	}
}
export default Bookings;