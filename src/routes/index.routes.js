const express = require('express');
const router = express.Router();
const usersRouter = require('./users/user.routes');
const authRouter = require("../routes/auth/auth.routes" )


router.get('/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to the HEALTH API'
    });
});

//Router  /users
router.use("/users", usersRouter);

//Router  /auth 
router.use("/auth", authRouter)

module.exports = router;
