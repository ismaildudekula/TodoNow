import { useEffect } from "react";
import { useState } from "react";

import classes from './styles.module.css';
import TodoItem from "./components/todo-item";
import TodoDetails from "./components/todo-details";
import { Skeleton } from "@mui/material";


function App() {

  const [loading, setLoading] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [todoDetails,setTodoDetails] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);


  async function fetchTodoList(){

    try{
      setLoading(true);
      const apiResponse = await fetch('https://dummyjson.com/todos');
      const jsonData = await apiResponse.json();
      
      if(jsonData?.todos && jsonData?.todos?.length > 0){
        setTodoList(jsonData?.todos);
        setLoading(false);
        setErrorMsg('')
      }
      else{
        setTodoList([]);
        setLoading(false);
        setErrorMsg('');
      }

    }
    catch(err){
      console.log(err);
      setErrorMsg('Some Error Occured');
    }

  }

  async function fetchTodoDetails(todoId){

    console.log(todoId);
    

    try{

      const apiResponse = await fetch(`https://dummyjson.com/todos/${todoId}`);
      const todoDetails = await apiResponse.json();
      if(todoDetails){
        setTodoDetails(todoDetails);
        console.log(todoDetails);
        
        setOpenDialog(true);
      }
      else{
        setTodoDetails([]);
        setOpenDialog(false);
      }

    }catch(err){
      console.log(err);

    }
  } 

  useEffect(() => {
    fetchTodoList();
  },[])

  if(loading){
    return <Skeleton height={'90vh'} width={'90%'}></Skeleton>
  }

  return (
    <div className={classes.mainWrapper}>
      <h1 className={classes.headerTitle}>TodoNow App</h1>
      <div className={classes.todoListWrapper}>
        {
          todoList && todoList?.length > 0 ? 
          todoList.map((todoItem,index) => <TodoItem fetchTodoDetails = {fetchTodoDetails} key = {index} todo = {todoItem}/>) : null
        }
      </div>
      <TodoDetails 
        todoDetails={todoDetails} 
        openDialog={openDialog}
        setOpenDialog = {setOpenDialog}
        setTodoDetails = {setTodoDetails}
      />
    </div>
  )
}

export default App
