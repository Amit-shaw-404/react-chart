import {Grid, makeStyles} from "@material-ui/core";
import { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

import Inputs from './Inputs';
import Graph from './components/graph';

const withStyles=makeStyles({
  root:{
    marginTop:'20px',
  },
  resizeable:{
    resize:'both',
    overflow:'auto',
    minWidth:'200px',
    minHeight:'content-fit',
    "&:hover":{
      border:'1px dotted grey',
    }
  },
  graphTypes:{
    margin:'10px 0',
    width:'100%'
  },
  graph:{
    width:'100%',
    display:'flex',
    alignItems:'center',
    flexDirection:'column',
  }
})

function App() {
  const classes=withStyles();
  const [edit, setEdit]=useState(false);
  const [cards, setCards]=useState([]);
  const [count, setCount]=useState(0);
  const [graphType, setGraphType]=useState(0);
  useEffect(()=>{
    axios.get("https://precily-task.herokuapp.com/getData")
    .then(res=>{
      setCards(res.data.activities);
      setCount(res.data.count);
    })
    .catch(err=>{
    })
  }, [])
  const handleBackend=()=>{
    axios.post("https://precily-task.herokuapp.com/addNew", {activities:cards, count:parseInt(count)})
    .then(res=>{
      axios.get("https://precily-task.herokuapp.com/getData")
      .then(response=>{
        setCount(response.data.count);
      })
    })
    .catch(err=>{
    })
  }
  return (
    <div>
      <Grid container className={classes.root} justify="space-around">
        <Grid item className={classes.resizeable}>
          <Inputs 
            edit={edit} 
            setEdit={setEdit} 
            cards={cards} 
            setCards={setCards}
            handleBackend={handleBackend}
            count={count}
          />
        </Grid>
        <Grid item className={classes.resizeable}>
          <h2 style={{textAlign:'center'}}>Select Graph Type</h2>
          <Grid container className={classes.graphTypes}>
            <Grid item onClick={()=>setGraphType(0)} style={{cursor:'pointer', margin:'0 10px'}}>
              <img
                src="https://www.mathworks.com/help/examples/graphics/win64/CompareTypesOfBarGraphsExample_01.png" 
                alt="bar graph"
                style={{width:'100%', maxHeight:'200px'}}
                >
                </img>
                <p style={{textAlign:'center'}}>Bar Graph</p>
                </Grid>
            <Grid item onClick={()=>setGraphType(1)} style={{cursor:'pointer', margin:'0 10px'}}>
            <img 
              src="https://www.advsofteng.com/doc/cdjavadoc/images/simpleline.png"
              alt="Line chart"
              style={{width:'100%', maxHeight:'200px'}}

            >
            </img>
            <p style={{textAlign:'center'}}>Line Graph</p>
            </Grid>
            <Grid item onClick={()=>setGraphType(2)} style={{cursor:'pointer', margin:'0 10px'}}>
              <img 
                src="https://lawctopus.com/clatalogue/wp-content/uploads/2020/08/Pie-chart.jpg"
                alt="pie chart"
                style={{width:'100%', maxHeight:'200px'}}

              >
              </img>
              <p style={{textAlign:'center'}}>Line Graph</p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.graph}>
        <h3>Your daily activity graph</h3>
        <Graph activities={cards} type={graphType}/>
      </div>
    </div>
  );
}

export default App;
