import React, {useState} from 'react';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux'

function Login(props) {
    const dispatch = useDispatch()
    const state = useSelector(s=>s)
    const [ob, setob]=useState({email:"", password: ""})

    const submit = e => {
        e.preventDefault()
        axios.post("http://localhost:5000/login",ob)
        .then(res=>res.data)
        .then(d=>{
            console.log(d)
            if(d.status)
            {
                alert("loggedin success")
                
				localStorage.setItem("token",d.data.token)
				localStorage.setItem("user",d.data.name)
				localStorage.setItem("role","user")
                dispatch({type:"loggedin_user",payload:d.data})
                props.history.push("/")

            }
            else{
                alert("login failed")
            }
        })
    }

    const adminlogin=e=>{
		e.preventDefault()
        axios.post("http://localhost:5000/login/admin",ob)
        .then(res=>res.data)
		.then(d=>{
			if(d.status)
			{   alert("admin loggedin")
				localStorage.setItem("token",d.data.token)
				localStorage.setItem("user","admin")
                localStorage.setItem("role","admin")
                dispatch({type:"loggedin_admin", payload : d.data.token})
				props.history.push("/")
			}
		})
		.catch(d=>console.log(d))
	}

    return (
        <form className = "form1" onSubmit = {submit}>
            <h2>Welcome to Bluebus</h2>
            <h3>Login</h3>
            <input name="email" placeholder="Email Address*" onChange={e=>setob({...ob, email:e.target.value})}/>
            
            <input name="password" placeholder="Set A Password*" onChange={e=>setob({...ob, password:e.target.value})} />
            <button>Sign in</button>
            <button onClick = {adminlogin} type= " button "><i class="fa fa-lock"></i> Admin</button>
        </form>
    )
}

export default Login
