import { useState } from "react";

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !deadline || !priority) {
      alert("Please fill in all the required fields.");
      return;
    }

    addTask({
      title,
      description,
      deadline: new Date(deadline),
      priority,
      completed: false
    });

    console.log(deadline);

    // Clear form fields
    setTitle("");
    setDescription("");
    setDeadline("");
    setPriority("medium");
  };

  return (
    <div className="inputForm">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <div className="row1">
            <label>
              Title :
              <input
                type="text"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>
              Deadline :
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </label>
            <label>
              Priority :
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="High">High</option>
                <option value="Medium">
                  Medium
                </option>
                <option value="Low">Low</option>
              </select>
            </label>
          </div>
          <div className="row2">
            <label>
              Description :
              <input
                type="text"
                className="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <button className="add" type="submit">
              <span>Add</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;