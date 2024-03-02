import { isToday } from 'date-fns';
import { formatDate } from "./functions/formatDate";

import doneImg from "./assets/checked.png";
import deleteImg from "./assets/delete.png";
import overduImg from "./assets/overdue.png";

function TaskList({ tasks, deleteTask, markAsCompleted }) {
  return (
    <div className="taskList">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Deadline</th>
            <th>Priority</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr
              key={index}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              <td>
                {task.deadline < new Date() && !isToday(task.deadline) && (
                  <img src={overduImg} style={{width: "1.2rem", position: "relative", left: -10}} alt="⏰" />
                )}
                {task.title}
              </td>
              <td>{task.description}</td>
              <td>{formatDate(task.deadline)}</td>
              <td>{task.priority}</td>
              <td className="actionButtons">
                <button
                  className="complete"
                  onClick={() => markAsCompleted(task.id)}
                >
                  <img src={doneImg} className="check" alt="done" />
                </button>
                <button className="delete" onClick={() => deleteTask(task.id)}>
                  <img src={deleteImg} className="remove" alt="delete" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
