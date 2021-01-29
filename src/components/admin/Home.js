import React from 'react'
import {useSelector,useDispatch} from 'react-redux'




    
function Home() {
    let dispatch=useDispatch()
	let state=useSelector(s=>s)
    let {loggedin}=state
    console.log(loggedin)
    return (
        <div>
            <h1>Hello Admin!</h1>
        </div>
    )
}

export default Home
