// import React, { Component } from 'react';
// import List from "./List"

// class App extends Component {
//   render () {
//     return (
//       <div className="container">
//         <div className="row">
//           <div className="col-md-6 mx-auto">
//             <h1 className="text-center">TODO</h1>
//             <List />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default App;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:5000";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);

  const loadTasks = async () => {
    const res = await axios.get(`${API}/tasks`);
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const submit = async () => {
    if (editId) {
      await axios.put(`${API}/tasks/${editId}`, { title });
      setEditId(null);
    } else {
      await axios.post(`${API}/tasks`, { title });
    }
    setTitle("");
    loadTasks();
  };

  const editTask = (task) => {
    setTitle(task.title);
    setEditId(task._id);
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/tasks/${id}`);
    loadTasks();
  };

  return (
    <div className="container">
      <h1>TODO</h1>

      <input
        placeholder="Task Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button className="submit" onClick={submit}>
        {editId ? "Update" : "Submit"}
      </button>

      {tasks.map((task) => (
        <div key={task._id} className="task">
          <span>{task.title}</span>
          <button className="edit" onClick={() => editTask(task)}>Edit</button>
          <button className="delete" onClick={() => deleteTask(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
