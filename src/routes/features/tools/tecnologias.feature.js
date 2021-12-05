const express = require('express');
const router = express.Router();
const  tecnologyHandler  = require("../../../controllers/features/tools/tecnologiasCRUD.handler")


router.get('/tools',tecnologyHandler.getAllTecnology);

router.post('/tools', tecnologyHandler.createTecnology)



module.exports = router;