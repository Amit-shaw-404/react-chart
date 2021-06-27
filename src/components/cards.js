import { Paper, makeStyles, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';


const withStyles=makeStyles({
    root:{
        minWidth:'200px',
        display:'flex',
        justifyContent:'space-between',
        padding:'10px',
        width:'auto',
        margin:'10px 0'
    },
})

export default function Cards({activity, hours, edit, handleDelete, index}){
    const classes=withStyles();
    return(
        <Paper className={classes.root}>
            <div>
                <h3>{activity}</h3>
                <p>{hours} hours every day</p>
            </div>
            {
                edit?
                <IconButton onClick={()=>handleDelete(index)}>
                    <CloseIcon/>
                </IconButton>
                :
                null
            }
        </Paper>
    )
}