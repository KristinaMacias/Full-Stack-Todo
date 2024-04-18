import React, { useEffect, useState } from 'react';
import EditTodo from './EditTodo';

const ListTodos = () => {
    //state
    const [todos, setTodos] = useState([]);

    //delete function
    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: 'DELETE'
            });
            setTodos(todos.filter(todo => todo.todo_id !== id)); // leave the ones that arent deleted
        } catch (err) {
            console.error("Oops! Something went wrong: ", err.message);
        }
    }

    //fetch todos from the server
    const getTodos = async () => {
        try {
            const response = await fetch('http://localhost:5000/todos');
            const data = await response.json();
            
            setTodos(data);
        } catch (err) {
            console.error("Oops! Soemthing went wrong: ", err.message);
        }
    }

    //useEffect (calls getTodos when the component mounts)
    useEffect (() => {
        getTodos();
    }, [])

    return (
        <section className="list-todos-container">
            <h1>List of Todos:</h1>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {/* map here */}
                    {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td>
                                <EditTodo todo={todo} />
                            </td>
                            <td>
                                <button onClick={() => deleteTodo(todo.todo_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}

export default ListTodos;