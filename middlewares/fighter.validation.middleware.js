const { fighter } = require('../models/fighter');
const Validator = require("./validator");

const createFighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during creation

    const errFillingFields = Validator.checkFillingFields(req.body, fighter);
    const errRequiredFields = Validator.checkRequiredFields(req.body, fighter);
    const errForbiddenFields = Validator.checkForbiddenFields(req.body, fighter);

    if (!('health' in req.body)){
        req.body.health = fighter.health;
    }

    if (errFillingFields.length || errRequiredFields.length || errForbiddenFields.length) {
        req.valid = false;
        res.err = new Error([...errFillingFields, ...errRequiredFields, ...errForbiddenFields].join("; "))
    }else{
        req.valid = true;
    }

    next();
}

const updateFighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during update

    const errFillingFields = Validator.checkFillingFields(req.body, fighter);
    const errForbiddenFields = Validator.checkForbiddenFields(req.body, fighter);
    const errMissingFields = [];
    if (req.body.length===0){
        errMissingFields.push(new Error('At least one field required'));
    }

    if (errFillingFields.length || errRequiredFields.length || errMissingFields.length) {
        req.valid = false;
        res.err = new Error([...errFillingFields, ...errForbiddenFields, ...errMissingFields].join("; "))
    }else{
        req.valid = true;
    }

    next();
}

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;