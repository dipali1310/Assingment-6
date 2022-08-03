import express from 'express';
import { userController } from '../src/controller/userController.js';
const router = express.Router();

router.get('/users', (req, res) => {
    userController.getUsers(req, res);
});
router.get('/users/:id', (req, res) => {
    userController.getUser(req, res);
});
router.post('/createuser', (req, res) => {
    userController.createUser(req, res);
});
router.put('/updateUser/:id', (req, res) => {
    userController.updateUser(req, res);
});
router.delete('/deleteUser/:id', (req, res) => {
    userController.deleteUser(req, res);
});

export default router;