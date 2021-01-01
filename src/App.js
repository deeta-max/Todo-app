import React, { useState,useEffect } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import './App.css';
import Todo from './Todo';
import db from "./firebase";
import firebase from "firebase";

function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    db.collection("todos").orderBy("timestamp", "desc").onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id:doc.id, todo:doc.data().todo})))
    })
  }, []);
 
  function addTodo(event){
    event.preventDefault();
    db.collection("todos").add({
      todo:input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setInput("");
  };

  return (
    <div className="App">
    <h1>Hello User</h1> 
    <form className="add-form"> 
    <FormControl  >
      <InputLabel className="add_input" htmlFor="my-input">Add new todo item</InputLabel>
      <Input className="add_input" onChange={event => setInput(event.target.value)} value={input} placeholder="New Item"  id="my-input" aria-describedby="my-helper-text" />
    </FormControl>
    <Button className="add_button" disabled={!input}  type="submit" onClick={addTodo} variant="contained" color="primary">
    Add Todo
    </Button>
    </form>
    <ul>
      {todos.map(todo =><Todo todo={todo} />)}
    </ul>
    </div>
  );
}

export default App;
