import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from '@mui/material/Input';
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

const modalStyle = {
  width: '100%',
  // display: 'flex',
  // justifyContent: 'center',
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
  maxWidth: '400px'
};

const EditTodo = ({text, id}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [description, setDescription] = useState('');

  const onSubmitForm = async (e) => {
    // we want page to refresh, so no preventDefault
    // e.preventDefault();
    try {
      // this works too, description const will be key and it will show it's value in key-value pair, description: 'text'
      // const body = {description};
      const body = {description: description};

      // const response = await fetch(`http://localhost:5000/todos/${id}`, {
      //   method: "PUT",
      //   headers: {"Content-Type": "application/json"},
      //   body: JSON.stringify(body)
      // })
      // const response = await fetch(`https://michulee-todo-server.herokuapp.com/todos/${id}`, {
      //   method: "PUT",
      //   headers: {"Content-Type": "application/json"},
      //   body: JSON.stringify(body)
      // })
      const response = await fetch(`/todos/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      })

    } catch (error) {
      console.log(error.message)
    }

    // TODO prob shouldn't combine 2 trycatches?
    try {
      // this works too, description const will be key and it will show it's value in key-value pair, description: 'text'
      // const body = {description};
      const body = {description: description};

      // const response = await fetch(`http://localhost:5000/completeTodos/${id}`, {
      //   method: "PUT",
      //   headers: {"Content-Type": "application/json"},
      //   body: JSON.stringify(body)
      // })
      // const response = await fetch(`https://michulee-todo-server.herokuapp.com/completeTodos/${id}`, {
      //   method: "PUT",
      //   headers: {"Content-Type": "application/json"},
      //   body: JSON.stringify(body)
      // })
      const response = await fetch(`/completeTodos/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      })
      
    } catch (error) {
      console.log(error.message)
    }

  }

  return (
    <>
    {/* <div> */}
      <IconButton
        onClick={handleOpen}
        color="secondary"
        aria-label="add an alarm"
      >
        <EditIcon />
      </IconButton>
      <Modal
        sx={modalStyle}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={onSubmitForm} className="boxContents">
            <TextField onChange={(e) => setDescription(e.target.value)} id="standard-basic" label={text} variant="standard" />
            {/* <TextField id="standard-basic" label="Change task" variant="standard"/> */}
            <span><Button type="submit" className="button" variant="contained">Rename</Button></span>
          </form>
        </Box>
      </Modal>
      {/* </div> */}
      </>
  );
};

export default EditTodo;
