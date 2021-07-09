import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  //when app loads,we need to listen to db and fetch new todos as they get added/removed
  useEffect(() => {
    //this code here.... fires when app.js loads
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  const addTodo = (event) => {
    //this will fire off when we click on button
    event.preventDefault(); //will stop REFRESH the page
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    //setTodos([...todos, input]); //called as spread
    setInput(""); //clear up the input after clicking addTodo
  };

  return (
    <div className="App">
      <h1 className="App-header">🔥🔥Welcome Programmers!🔥🔥</h1>

      <form>
        <div className="InputBox">
          <FormControl>
            <InputLabel>✅ Write a Todo</InputLabel>
            <Input
              value={input}
              onChange={(event) => setInput(event.target.value)}
            ></Input>
          </FormControl>
          <span></span>
          <Button
            disabled={!input}
            type="submit"
            onClick={addTodo}
            variant="contained"
            color="primary"
          >
            Add Todo
          </Button>
        </div>
      </form>
      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} />
          // <li>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
