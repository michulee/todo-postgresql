import React, { useEffect, useState } from "react";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

import EditTodo from "./EditTodo";

import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

const CompletedTodo = (props) => {
  const [completeTodo, setCompleteTodo] = useState('');

  const { window } = props;
  const [open, setOpen] = React.useState(false);
  const container = window !== undefined ? () => window().document.body : undefined;

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  

  // delete complete todo by id
  const deleteCompleteTodo = async (id) => {
    try {
      // const deleteTodo = await fetch(`http://localhost:5000/completeTodos/${id}`, {
      //   method: "DELETE"
      // });
      // const deleteTodo = await fetch(`https://michulee-todo-server.herokuapp.com/completeTodos/${id}`, {
      //   method: "DELETE"
      // });
      const deleteTodo = await fetch(`/completeTodos/${id}`, {
        method: "DELETE"
      });

      // without this setTodo filter, page would refresh
      // with filter, componentDidUpdate is called which manipulates DOM, so no page refresh
      setCompleteTodo(completeTodo.filter(todo => todo.completetodo_id !== id))
    } catch (error) {
      console.log(error.message)
    }
  }

  // get all complete todos
  const getCompleteTodos = async () => {
    try {
      // const response = await fetch("http://localhost:5000/completeTodos");
      // const response = await fetch("https://michulee-todo-server.herokuapp.com/completeTodos");
      const response = await fetch("/completeTodos");

      const data = await response.json();

      setCompleteTodo(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getCompleteTodos();
  }, []);

  // work on transition from completed to uncompleted
  const incompleteTodo = async (id) => {
      try {
        // promise
        // const body = await fetch(`http://localhost:5000/completeTodos/${id}`)
        // const body = await fetch(`https://michulee-todo-server.herokuapp.com/completeTodos/${id}`)
        const body = await fetch(`/completeTodos/${id}`)

        const data = await body.json();
        const add = {description: data.description}

        // const response = await fetch('http://localhost:5000/todos', {
        //   method: "POST",
        //   headers: {"Content-Type": "application/json"},
        //   body: JSON.stringify(add)
        // })
        // const response = await fetch('https://michulee-todo-server.herokuapp.com/todos', {
        //   method: "POST",
        //   headers: {"Content-Type": "application/json"},
        //   body: JSON.stringify(add)
        // })
        const response = await fetch('/todos', {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(add)
        })

      } catch (error) {
        console.log(error.message)
      }
    deleteCompleteTodo(id);

    // BUG force refresh doesn't work because of the drawer for some reason
    // window.location.href = '/';
  }

  if (completeTodo) {
    return (
      <>
        <Root>
          <CssBaseline />
          <Global
            styles={{
              '.MuiDrawer-root > .MuiPaper-root': {
                height: `calc(50% - ${drawerBleeding}px)`,
                overflow: 'visible',
              },
            }}
          />
          <Box sx={{ textAlign: 'center', pt: 1}} className="bottom">
            <Button onClick={toggleDrawer(true)}>Show Completed Tasks</Button>
          </Box>
          <SwipeableDrawer
            container={container}
            anchor="bottom"
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            swipeAreaWidth={drawerBleeding}
            disableSwipeToOpen={false}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <StyledBox
              sx={{
                position: 'absolute',
                top: -drawerBleeding,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                visibility: 'visible',
                right: 0,
                left: 0,
              }}
            >
              {/* <Puller sx={{background: 'white'}}/> */}
              {/* <Typography sx={{ p: 2, color: 'text.secondary'}}> </Typography> */}
            </StyledBox>
            <StyledBox
              sx={{
                px: 2,
                pb: 2,
                height: '100%',
                overflow: 'auto',
              }}
            >
              {/* TODO need to work on delete transition from completed to uncompleted */}
              {/* .todo .item not working, but .item works */}
              {completeTodo.map((obj) => (
                <FormGroup key={obj.completetodo_id}>
                  <div className="item test">
                    <FormControlLabel
                      onClick={() => incompleteTodo(obj.completetodo_id)}
                      control={<Checkbox defaultChecked />}
                      label={obj.description}
                    />
                    <div className="overlay">
                      <EditTodo text={obj.description} id={obj.completetodo_id}/>
                      {/* <IconButton onClick={() => updateTodo(obj.todo_id)} color="secondary" aria-label="add an alarm">
                        <EditIcon />
                      </IconButton> */}
                      <IconButton onClick={() => deleteCompleteTodo(obj.completetodo_id)} color="secondary" aria-label="add an alarm">
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </div>
                </FormGroup>
              ))}

            </StyledBox>
          </SwipeableDrawer>
        </Root>
      </>
    );
  } else {
    return null;
  }
};

export default CompletedTodo;
