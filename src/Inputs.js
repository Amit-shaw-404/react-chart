import {Button, makeStyles, TextField} from '@material-ui/core'
import { useState } from 'react';

import Cards from './components/cards';

const withStyles=makeStyles({
    root:{
        margin:'10px',
    },
    buttonContainer:{
        display:'flex',
        justifyContent:'center',
    },
    button:{
        margin:'0 10px'
    },
    addActivity:{
        margin:"20px 0",
        display:'flex',
        justifyContent:'center',
        width:'100%'
    },
    input:{
        margin:'0 5px'
    },
    cardsContainer:{
        width:'100%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
    },
    editFooter:{
        display:'flex',
        justifyContent:'center',
        margin:'10px 0'
    }
})
export default function Inputs({edit, cards, setCards, setEdit, handleBackend, count}){
    const classes=withStyles();
    const [activity, setActivity]=useState({
        activity:'',
        hours:0,
    });

    const handleAdd=()=>{
        if(activity.activity===''){
            alert("Please fill the activity box");
        }else if(parseInt(activity.hours)>24){
            alert("Hours should be less than 24");
        }else{
            let items=cards;
            items.push(activity)
            setCards(items);
            setActivity({
                activity:'',
                hours:0
            })
        }
    }
    const handleChange=(event)=>{
        setActivity({...activity, [event.target.name]:event.target.value});
    }
    const handleAddNew=()=>{
        setCards([]);
        setEdit(true);
    }
    const handleUpdate=()=>{
        setEdit(true);
    }
    const handleTotalUpdate=()=>{
        setEdit(false);
        handleBackend();
    }
    const handleDelete=(index)=>{
        var temp=cards.filter((card, i)=>i!==index?card:null);
        setCards(temp);
    }

    return(
        <div className={classes.root}>
            <div className={classes.buttonContainer}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    className={classes.button}
                    onClick={handleAddNew}
                    >
                        Add New
                    </Button>
                <Button
                    variant="outlined"
                    color="secondary" 
                    className={classes.button}
                    onClick={handleUpdate}
                    >
                        Update
                    </Button>
            </div>
            {
                edit?
                <div>
                    <div className={classes.addActivity}>
                        <TextField 
                            className={classes.input} 
                            id="activity" 
                            name="activity" 
                            label="Activity" 
                            variant="outlined" 
                            required
                            value={activity.activity}
                            onChange={handleChange}
                            />
                        <TextField 
                            className={classes.input} 
                            id="hours" 
                            name="hours" 
                            label="Hours" 
                            variant="outlined" 
                            required
                            value={activity.hours}
                            onChange={handleChange}
                            />
                        <Button 
                            className={classes.input} 
                            variant="contained" 
                            color="secondary"
                            onClick={handleAdd}
                        >
                            add
                        </Button>
                    </div>
                    <div className={classes.cardsContainer}>
                        {
                            cards.length!==0?
                            cards.map((card, index)=>(
                                <Cards 
                                    activity={card.activity}
                                    key={index} 
                                    hours={card.hours} 
                                    edit={edit} 
                                    handleDelete={handleDelete}
                                    index={index}
                                />
                            ))
                            :
                            <h2 style={{textAlign:'center'}}>Add Cards</h2>
                        }
                    </div>
                    <div className={classes.editFooter}>
                        <Button variant="contained" color="primary" onClick={handleTotalUpdate}>Done</Button>
                    </div>
                </div>
                :
                <div className={classes.cardsContainer}>
                    {
                        cards.length!==0?
                        cards.map((card, index)=>(
                        <Cards activity={card.activity} key={index} hours={card.hours} edit={edit}/>
                        ))
                        :
                        <h2 style={{textAlign:'center'}}>No Data to show</h2>
                    }
                </div>
            }
            <h3>Total Api called : {count}</h3>
        </div>
    )
}