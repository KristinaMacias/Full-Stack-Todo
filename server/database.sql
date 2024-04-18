CREATE DATABASE perntodo; 

/* create table called todo with two columns: todo_id and description */
/*todo_id is to uniquely identify each todo item. Description is the actual task that needs to be done and is a string of up to 255 characters. */
/* SERIAL is a shorthand for creating an auto-incrementing integer column. */
/* PRIMARY KEY is used to uniquely identify each row in the table. */
CREATE TABLE todo (
    todo_id SERIAL PRIMARY KEY, 
    description VARCHAR(255)
);

