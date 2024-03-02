import React, { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    {
      id:1,
      title: "Shopping",
      description: "Buy groceries and household items",
      deadline: new Date("2024-03-08T17:00:00"),
      priority: "Low",
      completed: false,
    },
    {
      id:2,
      title: "Exercise",
      description: "Go for a jog in the park",
      deadline: new Date("2024-03-15T07:00:00"),
      priority: "Medium",
      completed: false,
    }
  ]);

  const [filter, setFilter] = useState("all"); // "all", "pending", "completed"
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOption, setSortOption] = useState(null); // "date", "priority", null

  function addTask(task) {
    setTasks([...tasks, { ...task, id: tasks.length + 1 }]);
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function markAsCompleted(id) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  }

  function filterTasks(type) {
    setFilter(type);
  }

  function sortTasks(option) {
    setSortOption(option);
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortOption === "date") {
      return new Date(a.deadline) - new Date(b.deadline);
    } else if (sortOption === "priority") {
      const priorityOrder = { "Low": 3, "Medium": 2, "High": 1 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  const filteredTasks = sortedTasks.filter(task => {
    const titleMatches = task.title.toLowerCase().includes(searchKeyword.toLowerCase());
    if (filter === "all") {
      return titleMatches;
    } else if (filter === "pending") {
      return !task.completed && titleMatches;
    } else if (filter === "completed") {
      return task.completed && titleMatches;
    }
    return titleMatches;
  });

  return (
    <div className="App">
      <TaskForm addTask={addTask} />
      <div className="functions">
        <input
          type="text"
          className="searchBar"
          placeholder="Search by title"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <div className="filter">

        <button onClick={() => filterTasks("all")}>All</button>
        <button onClick={() => filterTasks("pending")}>Pending</button>
        <button onClick={() => filterTasks("completed")}>Completed</button>
        </div>
        <label style={{color: "#f1f5f8"}}>Sort by:
        <select onChange={(e) => sortTasks(e.target.value)} style={{background: "#f1f5f8", border: "2px solid black", borderRadius: "7px"}}>
          <option value="">None</option>
          <option value="date">Date</option>
          <option value="priority">Priority</option>
        </select>
        </label>
      </div>
      <TaskList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        markAsCompleted={markAsCompleted}
      />
    </div>
  );
}

export default App;
