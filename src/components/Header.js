import React from 'react'

import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'

function Header() {

    let dispatch = useDispatch()
    let state = useSelector(s=>s)
    
    let {user, loggedin, role} = state

    return (

        <header>
            <ul>
            <li><Link to = '/'>Home</Link></li>
            </ul>

        {
            !loggedin?<ul>
                <li><Link to = '/login'>login</Link></li>
                <li><Link to = '/signup'>Signup</Link></li>
            </ul>
            :null
        }
        {
            role==="admin"?<ul>
            <li><Link to='/admin/index'>Welcome Admin</Link></li>
            <li><Link to='/admin/buses'>buses</Link></li>
            <li><Link to='/admin/bookings'>bookings</Link></li>
            <li onClick = {e => dispatch({type: "logout"})}><Link to='/'>logout</Link></li>
            </ul>
            :null
        }

        {role==="user"?<ul>
			<li><Link to='/user/index'>welcome {user}</Link></li>
			<li onClick = {e => dispatch({type: "logout"})}><Link to='/'>logout</Link></li>
		</ul>
		:null}
        </header>

        
    )
}

export default Header
