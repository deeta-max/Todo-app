import { Button,FormControl,Input,InputLabel,List, ListItem, ListItemText, makeStyles, Modal } from '@material-ui/core';
import React, { useState } from 'react';
import db from './firebase';
import  './Todo.css';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((themes) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:"-200px"        
      },
    paper:{
        position:"absolute",
        width:400,
        backgroundColor:"#eeeeee",
        border:"2px solid #000",
        boxShadow:themes.shadows[5],
        padding:themes.spacing(2,4,3),
    },
}))

function Todo(props) {

    const [close, setClose] = useState(false);
    const classes = useStyles();
    const [input, setInput] = useState("");

    const handleOpen = e => {
        db.collection("todos").doc(props.todo.id).set({
            todo:input
        }, {merge: true})
        setClose(false);
        setInput("")
    };

    return (
        <>
        <Modal
        className={classes.modal}
        open = {close}
        onClose = {e => setClose(false)} >
        <div className={classes.paper}>
            <h1 className="edit-heading">Edit Todo Item </h1>
            <FormControl className="edit-input">
            <InputLabel htmlFor="my-input">Add new todo item</InputLabel>
            <Input  onChange={event => setInput(event.target.value)} value={input} placeholder="Edit Item"  id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
           
            <Button className="edit-input" disabled={!input} onClick = {handleOpen} variant="contained" color="primary">Update Todo</Button>
        </div>    
        </Modal>
        <List className="todo_list" >
            <ListItem className="todo_item">
                <ListItemText primary={props.todo.todo} secondary="Dummy Deadline ⏰" />
            </ListItem>
            <Button className="eidt" onClick={e => setClose(true)} variant="contained" color="primary">Edit</Button>
            <DeleteIcon className="delete" onClick={event => db.collection("todos").doc(props.todo.id).delete()} />
            
        </List>
        </>
    )
}

export default Todo;
