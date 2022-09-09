//require the libraries
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { application, query } = require("express");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES

//create a todo
app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING * ", [description]);

        res.json(newTodo.rows[0])
    } catch (err) {
        console.error(err.message);
    }
})

//get all todos
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows)
    } catch (err) {
        console.error(err.message);
    }
})

//get a specific todo
app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            if (isNaN(id)) {
                res.status(400).send('Bad Request. Please provide a valid id')
            }
            else {
                const todo = await pool.query("SELECT * FROM todo WHERE todo_id = ($1)", [id]);
                if (todo == null) {
                    res.status(404).send('Not Found');
                }
                else {
                    res.json(todo.rows[0]);
                    res.status(200).send("success");
                }
            }
        }
    } catch (err) {
        console.error(err.message);
    }
        
})

//update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        constUpdateTodo = await pool.query("UPDATE todo SET description = ($1) WHERE todo_id = ($2)", [description, id]);
        res.json("to do was updated");
    } catch (err) {
        console.error(err.message);
    }
})

//delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = ($1)", [id]);
        res.json("Todo deleted");
    } catch (err) {
        console.error(err.message);
    }
})

//listen to port number 5000
app.listen(5000, () => {
    console.log("server has started on port 5000");
});

