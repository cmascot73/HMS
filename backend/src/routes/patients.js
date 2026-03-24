const express =require('express');
const router = express.Router();
const {getAllPatients} = require('../controller/patientController');

router.route('/').get(getAllPatients);// GET method

module.exports = router;