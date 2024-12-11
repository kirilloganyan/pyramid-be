const Router = require('express')
const router = new Router();
const userController = require('../controller/user.controller');


router.post('/user', userController.createUser);
router.get('/user', userController.getUsers);
router.get('/user/:id', userController.getUserById);
router.get('/user/tg_id/:id', userController.getUserByTgId);
router.put('/user', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

router.get('/', (req, res) => {
    res.send('API is working!');
});

module.exports = router;