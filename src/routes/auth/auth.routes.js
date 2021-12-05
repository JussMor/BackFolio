const express = require('express');
const router = express.Router();
const authHandler = require("../../controllers/auth/auth.handler")

router.get("/nominal", (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to the nominal'
    });
} )


router.post("/signup", authHandler.signup)

router.post("/signin", authHandler.signin)

router.post("/refresh-token", authHandler.refreshToken)

router.delete("/logout",authHandler.logout)


module.exports = router;