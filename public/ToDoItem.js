import React from "react";
import deleteIcon from "./assets/delete.png";

function ToDoItem(props) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <li>{props.text}</li>
      <button
        className="delete"
        onClick={() => {
          props.checked(props.id);
        }}
      >
        <img src={deleteIcon} alt="Delete" />
      </button>
    </div>
  );
}

export default ToDoItem;
