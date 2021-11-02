
// dotenv in db.js
// const dotenv = require("dotenv").config({ path: "./.env" });

const express = require('express');
const app = express();
const cors = require('cors');
// for writing queries with psql
const pool = require('./db');
const path = require('path');
const PORT = process.env.PATH

//middleware
app.use(cors());
app.use(express.json()); //req.body

// METHOD 1
// app.use(expres.static('client/build'))
// METHOD 2
// app.use('/', expres.static('client/build'))

if(process.env.NODE_ENV === 'production') {
    console.log(__dirname);
    console.log(path.join(__dirname, "./client/build"));
    // server static content
    // npm run build
    // METHOD 3
    app.use(express.static(path.join(__dirname, './client/build')))
}

console.log(__dirname);
console.log(path.join(__dirname, "./client/build"));

// routes

// create todo
/**
 * async for time-consuming I/O bound operations
 * async is for code that respond to events
 * visually it might work, but it doesn't 
 * e.g. preloading data, graphical UI
 * asynchronous is the ability to do something while waiting for something else to complete
 * concurrent is the ability to compute multiple things at the same time
 * */ 
app.post('/todos', async(req, res) => {
    try {
        console.log(req.body)
        const {description} = req.body;

        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
        // res.json(newTodo)

        // with RETURNING *, only want "rows" which shows inserted record data
        res.json(newTodo.rows[0])
    } 
    catch (error) {
        console.log(error.message)
    }
});

// get all todo
app.get('/todos', async(req, res) => {
    try {
        const allTodos = await pool.query('SELECT * FROM todo')
        res.json(allTodos.rows);
    } catch (error) {
        console.log(error.message)
    }
})

// get a todo
app.get('/todos/:id', async(req, res) => {
    try {
        console.log('get :', req.params)
        const {id} = req.params;
        const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', 
        [id])
        res.json(todo.rows[0])
    } catch (error) {
        console.log(error.message)
    }
})

// update a todo
app.put('/todos/:id', async(req, res) => {
    try {
        console.log('update: ', req.params)
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2', 
        [description, id])
        res.json("Todo was updated")
    } catch (error) {
        console.log(error.message)
    }
})

// delete a todo
app.delete('/todos/:id', async(req, res) => {
    try {
        console.log('delete :', req.params)
        const {id} = req.params;
        const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', 
        [id])
        res.json('Todo was deleted')
    } catch (error) {
        console.log(error.message)
    }
})

// post single compmlete todo
app.post('/completeTodos', async(req, res) => {
    try {
        console.log(req.body)
        const {description} = req.body;

        const newTodo = await pool.query("INSERT INTO completetodo (description) VALUES($1) RETURNING *", [description]);
        // res.json(newTodo)

        // with RETURNING *, only want "rows" which shows inserted record data
        res.json(newTodo.rows[0])
    } 
    catch (error) {
        console.log(error.message)
    }
});

// get all complete todo
app.get('/completeTodos', async(req, res) => {
    try {
        const allTodos = await pool.query('SELECT * FROM completetodo')
        res.json(allTodos.rows);
    } catch (error) {
        console.log(error.message)
    }
})

// get a complete todo
app.get('/completeTodos/:id', async(req, res) => {
    try {
        console.log('get :', req.params)
        const {id} = req.params;
        const todo = await pool.query('SELECT * FROM completetodo WHERE completetodo_id = $1', 
        [id])
        res.json(todo.rows[0])
    } catch (error) {
        console.log(error.message)
    }
})

// BUG update a completeTodo
app.put('/completeTodos/:id', async(req, res) => {
    try {
        console.log('update: ', req.params)
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query('UPDATE completetodo SET description = $1 WHERE completetodo_id = $2', 
        [description, id])
        res.json("Complete Todo was updated")
    } catch (error) {
        console.log(error.message)
    }
})

// delete a completeTodo
app.delete('/completeTodos/:id', async(req, res) => {
    try {
        console.log('delete :', req.params)
        const {id} = req.params;
        const deleteTodo = await pool.query('DELETE FROM completetodo WHERE completetodo_id = $1', 
        [id])
        res.json('Complete Todo was deleted')
    } catch (error) {
        console.log(error.message)
    }
})

// TODO 5redirect to homepage if trying to access page that doesn't exist
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})

// PORT is for production
// app.listen(process.env.PORT || process.env.LOCAL_PORT, () => {
//     console.log(`server has started on port ${process.env.LOCAL_PORT}`)
// })
app.listen(process.env.PORT || process.env.LOCAL_PORT, () => {
    console.log(`server has started on port ${process.env.LOCAL_PORT}`)
})