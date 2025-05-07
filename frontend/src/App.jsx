import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./components/Login";
import { Route, BrowserRouter, Routes } from "react-router";
import Register from "./components/Register";
// import TaskManager from "./components/Task";
import TaskManager from "./components/TaskManager";
import useAuthStore from "./store/authStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "./utils/toast";
import { axiosInstance } from "./utils/axiosConfig";
import socket from "./socket";
import useTaskStore from "./store/taskStore";

function App() {
  const { user, setUser } = useAuthStore();
  const { updateTask, setTasks, tasks } = useTaskStore();

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const { data } = await axiosInstance.get("/auth/me");
  //       const { data: user } = data;

  //       setUser(user);
  //       socket.emit("join", user._id);
  //     } catch (error) {
  //       console.log(error);
  //       setUser(null);
  //     }
  //   }
  //   fetchData();

  //   socket.on("update_task", (task)=>{

  //     const {_id,...resTask} = task
  //     console.log(_id, resTask);

  //     updateTask(_id, resTask);

  //   })

  //   return ()=>{
  //     socket.off("update_task", (task)=>{

  //       const {_id,...resTask} = task
  //       console.log(_id, resTask);

  //       updateTask(_id, resTask);

  //     })
  //   }
  // }, []);
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axiosInstance.get("/auth/me");
        const { data: user } = data;

        setUser(user);
        socket.emit("join", user._id);
      } catch (error) {
        console.log(error);
        setUser(null);
      }
    }

    fetchData();

    const handleUpdateTask = (task) => {
      const { _id, ...resTask } = task;
      const currentTasks = useTaskStore.getState().tasks;
      const setTasks = useTaskStore.getState().setTasks;

      const newTasks = currentTasks.map((t) => (t._id == _id ? task : t));
      setTasks(newTasks);
    };

    const handleCreateTask = (task) => {
      const currentTasks = useTaskStore.getState().tasks;
      const setTasks = useTaskStore.getState().setTasks;
      const exists = currentTasks.some((t) => t._id == task._id);
      if (!exists) {
        setTasks([...currentTasks, task]);
      }
      
    };

    const handleDeleteTask = (task) => {
      const currentTasks = useTaskStore.getState().tasks;
      const setTasks = useTaskStore.getState().setTasks;
      setTasks(currentTasks.filter((t) => t._id != task._id));
    };

    socket.on("update_task", handleUpdateTask);
    socket.on("create_task", handleCreateTask);
    socket.on("delete_task", handleDeleteTask);

    return () => {
      socket.off("update_task", handleUpdateTask);
      socket.off("create_task", handleCreateTask);
      socket.off("delete_task", handleDeleteTask);
    };
  }, []);

  const logOut = async () => {
    try {
      await axiosInstance.delete("/auth/logout");

      showToast("success", "Log Out Successfully.");

      setTimeout(() => {
        setUser(null);
      }, 1500);
    } catch (error) {
      console.log(error);

      showToast("error", error);
    }
  };
  return (
    <>
      {/* <TaskManager /> */}
      {user && (
        <nav className="d-flex justify-content-between align-items-center">
          <h1>Task</h1>
          <button className="btn btn-primary" onClick={logOut}>
            Log Out
          </button>
        </nav>
      )}

      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={user ? <TaskManager /> : <Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
      {/* <Login /> */}
    </>
  );
}

export default App;
