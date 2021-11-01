import React from "react";
import "./App.css";

import CompletedTodo from "./components/CompletedTodo";
import InputTodo from "./components/InputTodo";
import ListTodo from "./components/ListTodos";
import Fab from '@mui/material/Fab';

import AddIcon from '@mui/icons-material/Add';


function App() {
  return (
    <>
      <div className="todo">
        <div className="header">
          <h1>Todo List</h1>
        </div>
        <div className="input">
          <InputTodo />
        </div>
        <div className="list">
          <ListTodo />
        </div>
        {/* <Fab color="secondary" aria-label="add">
          <AddIcon />
        </Fab> */}
        <div className="list">
          <CompletedTodo />
        </div>
      </div>
    </>
  );
}

export default App;
