import React, {useEffect} from 'react'
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
import 	HomePage from './components/Home'
import	LoginPage from './components/Login'
import	SignupPage from './components/Signup'
import	SeatsPage from './components/Seats'

import	AdminHome from './components/admin/Home'
import	AdminUsers from './components/admin/Users'
import	AdminBuses from './components/admin/Buses'
import	AdminBookings from './components/admin/Bookings'

import	UserHomePage from './components/user/Home'
import	Header from './components/Header'
import	Footer from './components/Footer'

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import {Provider} from 'react-redux';
import store from './redux/store'

function App() {
  let dispatch=useDispatch()
	let state=useSelector(s=>s)
  useEffect(function(){
		

		abc()

	},[])


	const abc= async () =>{
		const url="http://localhost:5000"
		let users=await axios.get(url+"/users").then(res=>res.data.data)
		let buses=await axios.get(url+"/buses").then(res=>res.data.data)
		// let bookings=await axios.get(url+"/bookings").then(res=>res.data.data)

		dispatch({type:"bootstrap",payload:{users,buses}})
	}

  return (
    
    <Router>
      {/* <Header/> */}
      <Switch>
      <Route exact path="/" component={HomePage}/>
			<Route exact path="/seats" component={SeatsPage}/>
			<Route exact path="/login" component={LoginPage}/>
			<Route exact path="/signup" component={SignupPage}/>
			<Route exact path="/admin/index" component={AdminHome}/>
			<Route exact path="/admin/user" component={AdminUsers}/>
			<Route exact path="/admin/buses" component={AdminBuses}/>
			<Route exact path="/admin/bookings" component={AdminBookings}/>
			<Route exact path="/user/index" component={UserHomePage}/>
      </Switch>
      <Footer/>
    </Router>
    
    
  )
}

export default App
