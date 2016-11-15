'use strict';
const TeamController = require('../controllers/team-controller'),
    express = require('express'),
    router = express.Router(),
    tc = new TeamController();

router.get('/teams', tc.getAll);

router.get('/agregar', tc.addForm);

router.post('/teams', tc.save);

router.get('/editar/:_id', tc.getOne);

router.put('/actualizar/:_id', tc.save);

router.delete('/eliminar/:_id', tc.delete);


module.exports = router;