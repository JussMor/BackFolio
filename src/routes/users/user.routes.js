const express = require('express');
const router = express.Router();
const usersHandler = require("../../controllers/users/user.handler")
const {verifyAccessToken} = require("../../helpers/token.helpers")

// get /api/users
router.get('/', usersHandler.getAll);

router.post("/", usersHandler.createUser )

router.get("/:id", usersHandler.getUserById)

router.put("/:id",verifyAccessToken, usersHandler.updateUserById)

router.delete("/:id",verifyAccessToken, usersHandler.deleteUserById)

module.exports = router;