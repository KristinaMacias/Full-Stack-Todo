import React, { useEffect, useState } from "react";

const EditTodo = ({ todo, onUpdateTodo }) => {
  const [description, setDescription] = useState(todo.description);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCancel = () => {
    setDescription(todo.description);
    setIsEditing(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch(
        `http://localhost:5000/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      onUpdateTodo({
        todo_id: todo.todo_id,
        description,
      });
      setIsEditing(false);
    } catch (err) {
      console.log("Oops! Something went wrong: ", err.message);
    }
  };

  return (
    <section className="edit-todo-container">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={description}
            onChange={handleInputChange}
            onBlur={handleSave}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setIsEditing(true)}>Edit</button>
      )}
    </section>
  );
};
export default EditTodo;
