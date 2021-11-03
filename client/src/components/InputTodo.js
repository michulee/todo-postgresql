import React, { useState } from 'react';

import Button from "@mui/material/Button";
import CheckIcon from '@mui/icons-material/Check';
import TextField from '@mui/material/TextField';

const InputTodo = () => {
    const [text, setText] = useState('')

    const onSubmitForm = async (e) => {
        // e.preventDefault();
        try {
            const body = {description: text};

            // const response = await fetch('http://localhost:5000/todos', {
            //     method: "POST",
            //     headers: {"Content-Type": "application/json"},
            //     body: JSON.stringify(body)
            // })
            // const response = await fetch('https://michulee-todo-server.herokuapp.com/todos', {
            //     method: "POST",
            //     headers: {"Content-Type": "application/json"},
            //     body: JSON.stringify(body)
            // })
            const response = await fetch('/api/todos', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            
        } catch (error) {
            console.log(error.message)
        }
    }

    return(
        <form className="add_task" onSubmit={onSubmitForm}>
            <TextField fullWidth id="outlined-basic" label="Add task" variant="outlined" onChange={(e) => setText(e.target.value)}/>
            <Button type="submit" variant="contained" endIcon={<CheckIcon />}>
                Add
            </Button>
        </form>
    );
}

export default InputTodo;