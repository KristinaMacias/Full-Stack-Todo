import React, { useState } from "react";

const InputTodo = () => {
  // State Variables
  const [description, setDescription] = useState("");

  // Handle Change (Input Field)
  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  // Handle Click (Add Button)
  const handleFormSubmit = async e => {
    e.preventDefault();
    try {
      const body = { description }; // Destrcture the description from the state
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST", // POST request
        headers: {
          "Content-Type": "application/json", // Specify the content type (JSON)
        },
        body: JSON.stringify(body), // Convert the body to a string
      });
      
      window.location ="/"
    } catch (err) {
      console.error("Oops. Something went wrong: ", err.message);
    }
  };

  return (
    <>
      <section id="todo-input-container">
        <h1>Enter a Todo:</h1>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={handleChange}
          />
          <button className="add-button">Add</button>
        </form>
      </section>
    </>
  );
};

export default InputTodo;
