import React, {useState} from 'react';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux'

function Login() {
    const dispatch = useDispatch()
    const state = useSelector(s=>s)
    const [ob, setob]=useState({email:"", password: ""})

    const submit = e => {
        e.preventDefault()
        axios.post("http://localhost:5000/login",ob)
        .then(res=>res.data)
        .then(d=>console.log(d))
    }
    return (
        <form onSubmit = {submit}>
            <h1>Login user</h1>
            <p>email</p>
            <input name="email" placeholder="email" onChange={e=>setob({...ob, email:e.target.value})}/>
            <p>password</p>
            <input name="password" placeholder="password" onChange={e=>setob({...ob, password:e.target.value})} />
            <button>Login</button>
        </form>
    )
}

export default Login
