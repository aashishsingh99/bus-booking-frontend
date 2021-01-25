import React from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-dom'

function Header() {


    const dispatch = useDispatch()
    const state = useSelector(s=>s)
    const {user, loggedin, role} = state

    return (

        <header>
        <ul>
            <li><Link to = '/'>Home</Link></li>
        </ul>

        {
            !loggedin?<ul>
                <li><Link to = '/login'>login</Link></li>
                <li><Link to = '/singup'>Signup</Link></li>
            </ul>
            :null
        }
        {
            role==="admin"?<ul>
            <li><Link to='/admin/index'>Welcome {user.name}</Link></li>
            <li><Link to='/admin/buses'>buses</Link></li>
            <li><Link to='/admin/bookings'>bookings</Link></li>
            <li><Link to='/'>logout</Link></li>
            </ul>
            :null
        }

        {role==="user"?<ul>
			<li><Link to='/user/index'>welcome {user.name}</Link></li>
			<li><Link to='/'>logout</Link></li>
		</ul>
		:null}
        </header>

        
    )
}

export default Header
