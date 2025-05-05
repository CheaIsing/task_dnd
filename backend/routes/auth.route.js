const express = require("express")
const UserController = require("../controllers/auth.controller")
const sanitizeMiddleware = require("../middleware/sanitize")
const { requireAuth } = require("../middleware/requireAuth.middleware")

const router = express.Router()

router.use(sanitizeMiddleware)

router.post("/login", UserController.login)
router.post("/register", UserController.register)
router.use(requireAuth)
router.delete("/logout", UserController.logOut)
router.get("/me" , UserController.getMe)

const authRoutes = router

module.exports = authRoutes