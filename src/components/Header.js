import React from 'react'

import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'

function Header() {

    let dispatch = useDispatch()
    let state = useSelector(s=>s)
    
    let {user, loggedin, role} = state

    return (

        <header>
            
            <Link to='/'><img style ={{"height":"88px","position":"relative","bottom":"6px"}} src = "https://www.graphicsprings.com/filestorage/stencils/f794ad52bccba5259868672d8db49de5.png?width=500&height=500"/></Link>
            <h2 style={{"fontFamily":"impact", "font-weight":"10"}}>BlueBus</h2>
            

        {
            !loggedin?<ul style={{"position":"relative","top":"5px","left":"10px"}}>
                <li><Link to = '/login'>Login</Link></li>
                <li><Link to = '/signup'>Signup</Link></li>
            </ul>
            :null
        }
        {
            role==="admin"?<ul style={{"position":"relative","top":"5px","left":"10px"}}>
            
            
            
            <li><Link to = '/'><i class="fa fa-home fa-10x" aria-hidden="true" ></i></Link></li>
            <li><Link to='/admin/index'>Welcome Admin</Link></li>
            <li><Link to='/admin/buses'>Buses</Link></li>
            <li><Link to='/admin/bookings'>Bookings</Link></li>
            <li onClick = {e => dispatch({type: "logout"})}><Link to='/login'>logout</Link></li>
            </ul>
            :null
        }

        {role==="user"?<ul style={{"position":"relative","top":"5px","right":"10px"}}>
        
            {/* <li><Link to = '/'><i class="fa fa-home fa-10x" fa-10x aria-hidden="true" ></i></Link></li> */}
            <li><Link to = '/'>Home</Link></li>
			<li><Link to='/user/index'>My Bookings</Link></li>
			<li onClick = {e => dispatch({type: "logout"})}><Link to='/login'>Logout</Link></li>
		</ul>
		:null}
        </header>

        
    )
}

export default Header
