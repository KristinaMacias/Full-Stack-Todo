import React, { useState } from "react";

const EditTodo = ({ todo, onSave }) => {
  const [description, setDescription] = useState(todo.description);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCancel = () => {
    setDescription(todo.description);
    setIsEditing(false);
  };

  const handleSave = () => {
    onSave(description);
    setIsEditing(false);
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
