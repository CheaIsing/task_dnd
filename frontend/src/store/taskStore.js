import { create } from "zustand";
import { axiosInstance } from "../utils/axiosConfig";
import { showToast } from "../utils/toast";

// Define our Zustand store
// const useTaskStore = create((set) => ({
//   // Initial empty tasks array
//   tasks: [],
//   isLoading: false,
//   error: null,

//   // Set loading state
//   setLoading: (isLoading) => set({ isLoading }),

//   // Set error state
//   setError: (error) => set({ error }),

//   // Set tasks from API
//   setTasks: (tasks) => set({ tasks }),

//   // Actions to update tasks
//   updateTaskStatus: (id, newStatus) =>
//     set((state) => ({
//       tasks: state.tasks.map(task =>
//         task._id === id ? { ...task, status: newStatus } : task
//       )
//     })),

//   addTask: async (task) => {
//     set((state) => ({ isLoading: true }));

//     try {
//       // API call to add a new task
//       const response = await fetch('http://localhost:3000/api/tasks', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(task),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to add task');
//       }

//       const data = await response.json();

//       // Add the new task to the state
//       set((state) => ({
//         tasks: [...state.tasks, data.data],
//         isLoading: false,
//       }));

//       return { success: true };
//     } catch (error) {
//       console.error('Error adding task:', error);
//       set((state) => ({
//         error: error.message,
//         isLoading: false
//       }));

//       return { success: false, error: error.message };
//     }
//   },

//   // Fetch tasks from API
//   fetchTasks: async () => {
//     set({ isLoading: true, error: null });

//     try {
//       // Replace this URL with your actual API endpoint
//       const response = await fetch('http://localhost:3000/api/tasks');

//       if (!response.ok) {
//         throw new Error('Failed to fetch tasks');
//       }

//       const data = await response.json();
//       const dataR = data.data;
//       set({ tasks: dataR, isLoading: false });
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//       set({ error: error.message, isLoading: false });

//       // Fallback to sample data if API fails
//       set({
//         tasks: [
//           { _id: '1', title: 'Landing page', description: 'Home page', status: 'pending', priority: 'medium' },
//           { _id: '2', title: 'Button', description: 'test', status: 'pending', priority: 'low' },
//           { _id: '3', title: 'Sidebar component', description: 'test', status: 'in_progress', priority: 'high' },
//           { _id: '4', title: 'Dashboard Page', description: 'test', status: 'completed', priority: 'high' },
//         ]
//       });
//     }
//   }
// }));

const useTaskStore = create((set, get) => ({
  tasks: [],

  isLoading: false,
  error: null,
  showUpdateModal: false,
  updateId: "",

  setUpdateId: (id) => {
    set({ updateId: id });
  },

  setShowUpdateModal: (boolean) => {
    set({ showUpdateModal: boolean });
  },

  setTasks: (tasks) => {
    set({ tasks });
  },

  setIsLoading: (loading) => {
    set({ isLoading: loading });
  },

  setError: (error) => {
    set({ error: error });
  },

  getAllTasks: async () => {
    try {
      set({ isLoading: true });
      const { data } = await axiosInstance.get("/tasks");
      const { data: tasks } = data;

      set({ tasks: tasks, error: null });

      console.log(tasks);
    } catch (error) {
      console.log(error);
      set({ tasks: [], error: error.message || "Failed to fetch tasks." });
    } finally {
      set({ isLoading: false });
    }
  },

  addTask: async (task) => {
    console.log(task);
    try {
      
      set({ isLoading: true });
      const { data } = await axiosInstance.post("/tasks", task);
      const { data: newTask } = data;

      set((state) => ({
        tasks: [...state.tasks, newTask],
      }));

      showToast("success", "Task added successfully.");
    } catch (error) {
      console.log(error);

      showToast("error", error.message);
    } finally {
      set({ isLoading: false });
    }
  },

  updateTaskStatus: async (taskId, newStatus) => {
    const currentTasks = get().tasks;
    let updateTask = currentTasks.filter((task) => task._id == taskId)[0];

    updateTask = {
      title: updateTask.title,
      description: updateTask.description,
      status: newStatus,
      priority: updateTask.priority,
    };
    try {
      await axiosInstance.put("/tasks/" + taskId, updateTask);

      set((state) => ({
        tasks: state.tasks.map((task) =>
          task._id == taskId ? { ...task, status: newStatus } : task
        ),
      }));

      showToast("success", "Update Task Successfully.");
    } catch (error) {
      console.log(error);
      showToast("error", "Failed to update task");
    }
  },

  updateTask: async (taskId, task) => {
    const currentTasks = get().tasks;
    let updateTask = currentTasks.filter((task) => task._id == taskId)[0];

    updateTask = {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
    };
    try {
      const {data} = await axiosInstance.put("/tasks/" + taskId, updateTask);
      const {data:newUpdateTask} = data

      set((state) => ({
        tasks: state.tasks.map(task=>task._id == taskId ? newUpdateTask :task)
      }));

      showToast("success", "Update Task Successfully.");
    } catch (error) {
      console.log(error);
      showToast("error", "Failed to update task");
    }
  },
  deleteTask: async(id)=>{
    try {
      await axiosInstance.delete("/tasks/" + id);
      const currentTasks = get().tasks;
      const newTasks = currentTasks.filter(task=>task._id != id)

      set((state) => ({
        tasks: newTasks
      }));

      showToast("success", "Delete Task Successfully.");
    } catch (error) {
      console.log(error);
      showToast("error", "Failed to delete task");
    }
  }

}));

export default useTaskStore;
