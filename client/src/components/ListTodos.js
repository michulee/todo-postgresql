import React, { useEffect, useState } from "react";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

import EditTodo from "./EditTodo";

const ListTodo = () => {
  const [todo, setTodo] = useState("");
  const [completeTodos, setCompleteTodo] = useState('');

  const deleteTodo = async (id) => {
    try {
      // const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
      //   method: "DELETE"
      // });
      // const deleteTodo = await fetch(`https://michulee-todo-server.herokuapp.com/todos/${id}`, {
      //   method: "DELETE"
      // });
      const deleteTodo = await fetch(`/api/todos/${id}`, {
        method: "DELETE"
      });

      // without this setTodo filter, page would refresh
      // with filter, componentDidUpdate is called which manipulates DOM, so no page refresh
      setTodo(todo.filter(todo => todo.todo_id !== id))
    } catch (error) {
      console.log(error.message)
    }
  }

  // get all todos
  const getTodos = async () => {
    try {
      // const response = await fetch("http://localhost:5000/todos");
      // const response = await fetch("https://michulee-todo-server.herokuapp.com/todos");
      // BUG
      /**
       * GET https://michulee-todo.herokuapp.com/todos 503 (Service Unavailable)
       * Unexpected token < in JSON at position 0
       */
      const response = await fetch("/api/todos");

      const data = await response.json();

      setTodo(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const completeTodo = async (id) => {
      try {
        // promise
        // const body = await fetch(`http://localhost:5000/todos/${id}`)
        // const body = await fetch(`https://michulee-todo-server.herokuapp.com/todos/${id}`)
        const body = await fetch(`/api/todos/${id}`)

        const data = await body.json();
        const add = {description: data.description}

        // const response = await fetch('http://localhost:5000/completeTodos', {
        //   method: "POST",
        //   headers: {"Content-Type": "application/json"},
        //   body: JSON.stringify(add)
        // })
        // const response = await fetch('https://michulee-todo-server.herokuapp.com/completeTodos', {
        //   method: "POST",
        //   headers: {"Content-Type": "application/json"},
        //   body: JSON.stringify(add)
        // })
        const response = await fetch('/api/completeTodos', {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(add)
        })
        
      } catch (error) {
        console.log(error.message)
      }
    deleteTodo(id);

    // force refresh because componentDidUpdate doesn't get called
    window.location.href = '/';
  }

  if (todo) {
    return (
      <>
        {todo.map((obj) => (
          <FormGroup key={obj.todo_id}>
            <div className="item">
              <FormControlLabel
                onClick={() => completeTodo(obj.todo_id)}
                control={<Checkbox />}
                label={obj.description}
              />
              <div className="overlay">
                <EditTodo text={obj.description} id={obj.todo_id}/>
                {/* <IconButton onClick={() => updateTodo(obj.todo_id)} color="secondary" aria-label="add an alarm">
                  <EditIcon />
                </IconButton> */}
                <IconButton onClick={() => deleteTodo(obj.todo_id)} color="secondary" aria-label="add an alarm">
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          </FormGroup>
        ))}

        {/* another way to return */}
        {/* {todo.map((obj) => {
          return(
            <FormGroup key={obj.todo_id}>
              <div className="item">
                <FormControlLabel control={<Checkbox />} label={obj.description} />
                <div className="overlay">
                  <EditTodo />
                  <DeleteTodo />
                </div>
              </div>
            </FormGroup>
          );
        })} */}
      </>
    );
  } else {
    return null;
  }
};

export default ListTodo;
