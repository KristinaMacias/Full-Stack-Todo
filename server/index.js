const express = require('express'); // import express module
const cors = require('cors'); // import cors module to allow cross-origin requests
const app = express(); // create express app (can use the methods of express module by using app object)
const pool = require('./db'); // import pool object from db.js file

// middleware
app.use(cors()); // to allow cross-origin requests (CORS)
app.use(express.json()); // parse json data from request body (to translate json data to js object)

// ROUTES HANDLERS //
// Create a todo (http post request) to the todos endpoint in a node.js application using express
app.post("/todos", async(req, res) => { //req for clientside and res for what i send back
    try {
        const {description} = req.body;
        //INSERT INTO is a command >> specifiy the table >> which key? >> VALUES with a placeholder >> second arg is the description coming from clientside
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", 
        [description]);
        res.json(newTodo.rows)
        console.log(description);
    } catch(err) {
        console.error("Uh oh! Something went wrong: ", err.message);
    }
});

// Get all todos
app.get("/todos", async(req, res) => {
    try {
        // allTodos awaits all from todos (*)
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows)
    } catch (err) {
        console.error('Uh oh! Something went wrong: ', err.message);
    }
})

// Get a todo (singular)
app.get("/todos/:id", async (req, res) => {
    try {
       const {id} = req.params;
       // await from all todos where one is specified (http://localhost:5000/todos/3) >> gets that todo with that id
       const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
       res.json(todo.rows[0])
    } catch(err) {
        console.error('Uh oh! Something went wrong: ', err.message);
    }
})

// Update a todo (Put)
app.put('/todos/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        // update todo by setting description/id with placeholder, second arg is what it updates to. 
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
        res.json("Todo was successfully updated");
    } catch (err) {
        console.error("Uh oh! Something went wrong: ", err.message);
    }
})

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const deletedTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

        res.json('Todo was successfully deleted');
    } catch (err) {
        console.error("Uh oh! Something went wrong: ", err.message);
    }
})

// listen for requests (start server) at port 5000
app.listen(5000, ()  => {
    console.log('Server is running on port 5000');
});

