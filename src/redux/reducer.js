let user = ""
let role = ""
let token = ""
let loggedin = false

if(localStorage.getItem("token"))
{
    user = localStorage.getItem("user")
    role = localStorage.getItem("role")
    token = localStorage.getItem("token")
    loggedin = true

}

const initialState = {

    buses: [],
    bus: {},
    users: [],
     
    admin: [],
    bookings: [],
    booking: [],
    user: user,
    role: role, 
    token: token,
    loggedin: loggedin,

}

const reducer = function(state = initialState,action ){
    console.log(state)
    switch(action.type)
    {
        
        case "bootstrap":
            return {
                ...state,
                ...action.payload
            }
        case "loggedin_user":
            return {
                ...state, 
                loggedin : true,
                user : action.payload.name,
                token : action.payload.token, 
                role : "user",
            }
        case "loggedin_admin":
            return {
                ...state, 
                loggedin : true,
                user : "admin",
                token : action.payload, 
                role : "admin",
            }
        case "logout":
            return {
                ...state,
                loggedin:false,
                user:"",
                token:"",
                role:""
            }
        case "setSingleBus":
            return {
                ...state, 
                bus: action.payload
            }
        case "my booking":
			return {
				...state,
				booking:action.payload
            }
        case "bookings":
            return {
                ...state,
                bookings:action.payload
            }
        case "buses":
            return {
                ...state,
                buses: action.payload
            }
        
        default:
            return state

    }
}
export default reducer