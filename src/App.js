import React, { useState } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import './App.css';
import Todo from './Todo';

function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
 
  function addTodo(event){
    event.preventDefault();
    setTodos([...todos, input]);
    setInput("");
  };

  return (
    <div className="App">
    <h1>Hello Deeta</h1> 
    <form> 
    <FormControl>
      <InputLabel htmlFor="my-input">Add new todo item</InputLabel>
      <Input onChange={event => setInput(event.target.value)} value={input} placeholder="New Item"  id="my-input" aria-describedby="my-helper-text" />
    </FormControl>
    <Button disabled={!input}  type="submit" onClick={addTodo} variant="contained" color="primary">
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
