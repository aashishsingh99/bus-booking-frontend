import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'

function Home() {

    let dispatch=useDispatch()
	let state=useSelector(s=>s)
    let {buses}=state
    
    const setSingleBus = x => {
        dispatch({type: "setSingleBus", payload: x})
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

export default Home
