const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

// TODO: Implement route controllers for fighter

router.get('/',(req,res,next)=>{
    try {
        res.data = FighterService.getAll();
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.get('/:id',(req,res,next)=>{
    try {
        res.data = FighterService.search({id: req.params.id});
        if (!res.data) throw new Error(`Fighter with id ${req.params.id} not found`);
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.post('/', createFighterValid, (req,res,next)=>{
    try {
        if (req.valid) {
            res.data = FighterService.create(req.body);
            if (!res.data) throw new Error(`Fighter not created`);
        }
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.put('/:id', updateFighterValid, (req,res,next)=>{
    try {
        if (req.valid) {
            res.data = FighterService.update(req.params.id, req.body);
            if (!res.data) throw new Error(`Fighter with id ${req.params.id} not found`);
        }
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.delete('/:id',(req,res,next)=>{
    try {
        res.data = FighterService.delete(req.params.id);
        if (!res.data) throw new Error(`Fighter with id ${req.params.id} not found`);
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router;