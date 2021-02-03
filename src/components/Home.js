import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {Card} from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
const useStyles = makeStyles((theme) => ({
	root: {
	  maxWidth: 600,
	},
	media: {
	  height: 0,
	  
	  paddingTop: '56.25%', // 16:9
	},
	expand: {
	  transform: 'rotate(0deg)',
	  marginLeft: 'auto',
	
	  transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	  }),
	},
	expandOpen: {
	  transform: 'rotate(180deg)',
	},
	avatar: {
	  backgroundColor: red[500],
	},
  }));
function Home() {

    let dispatch=useDispatch()
	let state=useSelector(s=>s)
	let {buses,loggedin}=state
	console.log("seebuses")
	console.log("lin")
	console.log(loggedin)
    const setSingleBus = x => {
        dispatch({type: "setSingleBus", payload: x})
    }
	const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
    return (
		
			
        <div className="buseslist">
            
			
            
			
			{/* <div className = "busesdiv">
				{buses.map(x=>
				<div className = "busesinnerdiv">
					
						
					<Link style={{"align items":"center","font-weight":"400"}}onClick={e=>setSingleBus(x)} to="/seats"><i style={{"color":"#13232f"}} class="fa fa-bus" aria-hidden="true"> View Seats {x.bus_title} {x.bus_from} - {x.bus_to}</i></Link>	
					
						
					
				</div>
				)}
			</div> */}
			{
				buses.map(x=>
			<Card style={{"width":"600px"}}className={classes.root}>
      <CardHeader
        
        
        title={x.bus_title}
        
      />
      <CardMedia
        className={classes.media}
        image={x.photo}
        
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
		<LocationOnIcon></LocationOnIcon> Boarding : {x.bus_from} ({x.bus_starttime})
            <br></br>
            <LocationOnIcon></LocationOnIcon> Arrival : {x.bus_to} ({x.bus_endtime})
            <br></br>
            <AccessAlarmsIcon></AccessAlarmsIcon> Duration : {x.bus_hours}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
	  <Link onClick={e=>setSingleBus(x)} to="/seats" ><i style={{"color":"black"}} class="fa fa-bus" aria-hidden="true">  View Seats</i></Link>
      </CardActions>
      
    </Card>
				)}
		</div>
		
		
    )
}

export default Home
