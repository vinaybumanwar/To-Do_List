import React, { useState } from "react";
import "./Todo.css";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
} from "@material-ui/core";
import db from "./firebase";
import { Button } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const classes = useStyles();
  const handleOpen = () => {
    setOpen(true);
  };
  const updateTodo = () => {
    //update todo with nw input text
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };
  var dt = new Date();
  var utcDate = dt.toUTCString();
  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)} className="Modalmain">
        <div className={classes.paper}>
          <h3>👇 You can edit the Task here...👇</h3>
          <input
            placeholder={props.todo.todo}
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <span></span>
          <Button onClick={updateTodo} className="Updatebutt">
            Update Todo
          </Button>
        </div>
      </Modal>
      <List className="todo__list">
        <ListItem>
          <ListItemAvatar></ListItemAvatar>
          <ListItemText primary={props.todo.todo} secondary={utcDate} />
        </ListItem>
        <div className="buttonss">
          <button className="editbutt" onClick={(e) => setOpen(true)}>
            {" "}
            Edit
          </button>
          <span></span>

          <DeleteForeverIcon
            className="butt"
            onClick={(event) =>
              db.collection("todos").doc(props.todo.id).delete()
            }
          />
        </div>
      </List>
    </>
  );
}

export default Todo;
