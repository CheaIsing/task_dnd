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
  const {updateTask, setTasks, tasks} = useTaskStore()
  // console.log(result);
  

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
  
    const handleUpdateTask = (data) => {
      const { _id, ...resTask } = data;
      // console.log(_id, resTask);
      const currentTasks = useTaskStore.getState().tasks
      const setTasks = useTaskStore.getState().setTasks
      
      console.log(currentTasks);
      

      const newTasks = currentTasks.map(task=>task._id == _id ? data : task)

      // console.log(newTasks);
      

      setTasks(newTasks)
    };
  
    socket.on("update_task", handleUpdateTask);
  

  }, []);
  

  const logOut = async()=>{
    try {
      await axiosInstance.delete("/auth/logout")
      
      showToast("success", "Log Out Successfully.")

      setTimeout(()=>{
        setUser(null);
      }, 1500)

    } catch (error) {
      console.log(error);
      
      showToast("error", error)
    }
  }
  return (
    <>
      {/* <TaskManager /> */}
      {user && (
        <nav className="d-flex justify-content-between align-items-center">
          <h1>Task</h1>
          <button className="btn btn-primary" onClick={logOut}>Log Out</button>
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
