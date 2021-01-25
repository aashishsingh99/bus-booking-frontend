import React,{useState} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'


function Signup() {

    const dispatch = useDispatch()
    const state = useSelector(s=>s)
    const [ob,setob] = useState({name: "", email: "", password: "", phone:""})
    return (
        <form>
            <h1>Signup</h1>
            <p>name</p>
            <input name="name" placeholder="name" onChange = {e=> setob({...ob, name:e.target.value})} />
            
            
            <p>name</p>
            <input name="email" placeholder="email" onChange = {e=> setob({...ob, email:e.target.value})} />
            
            
            <p>name</p>
            <input name="password" placeholder="password" onChange = {e=> setob({...ob, password:e.target.value})} />

            <p>phone</p>
            <input name="phone" placeholder="phone" onChange = {e=> setob({...ob, phone:e.target.value})} />
            
            <button>Signup</button>
            
        </form>
    )
}

export default Signup
