import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {Card} from 'react-bootstrap';
import { Button } from 'react-bootstrap';

function Home() {

    let dispatch=useDispatch()
	let state=useSelector(s=>s)
	let {buses,loggedin}=state
	console.log("seebuses")
	console.log("lin")
	console.log(loggedin)
    const setSingleBus = x => {
        dispatch({type: "setSingleBus", payload: x})
    }

    return (
		
			
        <div>
            
			<h4 className="sub-title">Available Buses: {buses.length}</h4>
            
			
			<div className = "busesdiv">
				{buses.map(x=>
				<div className = "busesinnerdiv">
					
						
					<Link style={{"align items":"center","font-weight":"400"}}onClick={e=>setSingleBus(x)} to="/seats"><i style={{"color":"#13232f"}} class="fa fa-bus" aria-hidden="true"> View Seats {x.bus_title} {x.bus_from} - {x.bus_to}</i></Link>	
					
						
					
				</div>
				)}
			</div>
		</div>
		
		
    )
}

export default Home
