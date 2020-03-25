
const { Router } = require('express');
const router = Router();

const { getVarias,createVaria , getVaria , deleteVaria , updateVaria } = require('../controllers/bis.controller');


router.route('/')
    .get(getVarias)
    .post(createVaria);


    router.route('/:id')
    .get(getVaria)
    .delete(deleteVaria)
    .put(updateVaria);

module.exports = router;