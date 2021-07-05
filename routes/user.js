const router = require("express").Router();
const Users = require("../controllers/user");

router.post("/api/v1/create-user", Users.createUser);
router.get("/api/v1/get-all-users" , Users.getAllUsers)
router.get("/api/v1/get-user-by-id/:id" , Users.getUserById)
router.post("/api/v1/login-user" , Users.loginUser)

module.exports = router;
