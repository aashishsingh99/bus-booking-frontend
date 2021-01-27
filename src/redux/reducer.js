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
    user: user, 
    admin: [],
    bookings: [],
    booking: [],
    role: role, 
    token: token,
    loggedin: loggedin,

}

const reducer = function(state = initialState,action ){
    
    switch(action.type)
    {
        // case "buses":
        //     return {
        //         ...state,
        //         buses: action.payload
        //     }
        
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
        
        
        default:
            return state

    }
}
export default reducer