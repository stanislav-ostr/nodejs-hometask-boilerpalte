const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// TODO: Implement route controllers for user

router.get('/',(req,res,next)=>{
    try {
        res.data = UserService.getAll();
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.get('/:id',(req,res,next)=>{
    try {
        res.data = UserService.search({id: req.params.id});
        if (!res.data) throw new Error(`User with id ${req.params.id} not found`);
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.post('/', createUserValid, (req,res,next)=>{
    try {
        if (req.valid) {
            res.data = UserService.create(req.body);
            if (!res.data) throw new Error(`User not created`);
        }
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.put('/:id', updateUserValid, (req,res,next)=>{
    try {
        if (req.valid) {
            res.data = UserService.update(req.params.id, req.body);
            if (!res.data) throw new Error(`User with id ${req.params.id} not found`);
        }
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.delete('/:id',(req,res,next)=>{
    try {
        res.data = UserService.delete(req.params.id);
        if (!res.data) throw new Error(`User with id ${req.params.id} not found`);
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router;