const router = require('express').Router();
const UserController = require('../controllers/userController.js');


router.get('/:city', UserController.get_orders);
router.post('/', UserController.post_orders);
router.post('/msg', UserController.send_message);
module.exports = router;