const express = require('express')
const router = express.Router();
const contactController = require('../controller/contactController')

router.post('/',contactController.createContact)
router.get('/find',contactController.findContact)
router.delete('/delete/:id',contactController.deleteContact)
router.post('/edit',contactController.editContact)
router.post('/fav',contactController.markAsFav)
router.post('/signupUser',contactController.signupUser)
router.post('/loginUser',contactController.loginUser)
module.exports = router