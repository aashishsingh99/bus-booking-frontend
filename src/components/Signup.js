import React,{useState} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'


function Signup(props) {

    const dispatch = useDispatch()
    const state = useSelector(s=>s)
    const [ob,setob] = useState({name: "", email: "", password: "", phone:""})
    const submit=e=>{
        e.preventDefault()
        axios.post("http://localhost:5000/signup",ob)
        .then(res=>alert(res.data.data.msg))
        .then(d=>props.history.push("/login"))
    }
    return (
        <form className = "form1" onSubmit = {submit}>
            <h1>Signup</h1>
            
            <input name="name" placeholder="name" onChange = {e=> setob({...ob, name:e.target.value})} />
            
            
            
            <input name="email" placeholder="email" onChange = {e=> setob({...ob, email:e.target.value})} />
            
            
            
            <input name="password" placeholder="password" onChange = {e=> setob({...ob, password:e.target.value})} />

            
            <input name="phone" placeholder="phone" onChange = {e=> setob({...ob, phone:e.target.value})} />
            
            <button>Signup</button>
            
        </form>
    )
}

export default Signup
