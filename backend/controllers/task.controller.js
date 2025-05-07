const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { sendResponse } = require("../utils/utils");
const Task = require("../models/Task");
const { default: mongoose } = require("mongoose");

class TaskController {
  static async getTasks(req, res) {
    // const user = req.user;
    try {
      const tasks = await Task.find({ }).populate({
        path: 'user',
        select: '-password'
      });

      sendResponse(res, 200, true, "Get all task successfully.", tasks);
    } catch (error) {
      console.error("TaskController getTask() error ", error);

      sendResponse(res, 500, false, "Server Error");
    }
  }
  static async getTask(req, res) {
    const user = req.user;
    const { _id } = req.params;

    try {
      const task = await Task.find({ user, _id }).populate({
        path: 'user',
        select: '-password'
      });;

      sendResponse(res, 200, true, "Get task successfully.", task);
    } catch (error) {
      console.error("TaskController getTask() error ", error);

      sendResponse(res, 500, false, "Server Error");
    }
  }
  static async createTask(req, res) {
    const user = req.user;
    const { title, description, status, priority } = req.body;

    try {
      
      let task = await Task.create({ title, description, status, user, priority });

      task = await task.populate({
        path: 'user',
        select: '-password'
      });

      sendResponse(res, 200, true, "Create task successfully.", task);
    } catch (error) {
      console.error("TaskController createTask() error ", error);

      sendResponse(res, 500, false, "Server Error");
    }
  }
  static async updateTask(req, res) {
    const user = req.user;
    const { _id } = req.params;
    const {title, description, status, priority} = req.body;

    if(!mongoose.isValidObjectId(_id)){
     return sendResponse(res, 400, false, "Task is not found.");
    }

    try {
      const updateTask = {title, description, status, priority}
      let task = await Task.findByIdAndUpdate(_id, updateTask, {new: true, runValidators: true});

      if(!task){
        return sendResponse(res, 400, false, "Task is not found.");
       }

       task = await task.populate({
        path: 'user',
        select: '-password'
      });

       const io = req.app.get("io");

       io.to(user).emit("update_task", task);


      sendResponse(res, 200, true, "Update task successfully.", task);
    } catch (error) {
      console.error("TaskController updateTask() error ", error);

      sendResponse(res, 500, false, "Server Error");
    }
  }


  static async deleteTask(req, res) {
    const user = req.user;
    const { _id } = req.params;

    try {
      if(!mongoose.isValidObjectId(_id)){
        return sendResponse(res, 400, false, "Task is not found.");
      }

      let task = await Task.findByIdAndDelete(_id);

      if(!task){
       return sendResponse(res, 400, false, "Task is not found.");
      }

      task = await task.populate({
        path: 'user',
        select: '-password'
      });

      sendResponse(res, 200, true, "Delete task successfully.", task);
    } catch (error) {
      console.error("TaskController deleteTask() error ", error);

      sendResponse(res, 500, false, "Server Error");
    }
  }
}

module.exports = TaskController;
