const express = require('express');
const router = express.Router();
const  tecnologyHandler  = require("../../../controllers/features/tools/tecnologiasCRUD.handler")

router.get('/tools/:id', tecnologyHandler.getOneTecnology);

router.get('/tools',tecnologyHandler.getAllTecnology);

router.post('/tools', tecnologyHandler.createTecnology)

router.put('/tools/:id/edit', tecnologyHandler.updateTecnologyById)

router.delete('/tools/:id/delete',tecnologyHandler.deleteTecnologyById)


module.exports = router;