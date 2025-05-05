const express = require("express")
const UserController = require("../controllers/auth.controller");
const TaskController = require("../controllers/task.controller");
const { requireAuth } = require("../middleware/requireAuth.middleware");

const router = express.Router()


router.get("/", TaskController.getTasks)
router.get("/:_id", TaskController.getTask);
router.use(requireAuth)

router.post("/", TaskController.createTask);
router.put("/:_id", TaskController.updateTask);

router.delete("/:_id", TaskController.deleteTask);

const taskRoutes = router
module.exports = taskRoutes