const { user } = require('../models/user');
const Validator = require('./validator');

const createUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during creation

    const errFillingFields = Validator.checkFillingFields(req.body, user);
    const errRequiredFields = Validator.checkRequiredFields(req.body, user);
    const errForbiddenFields = Validator.checkForbiddenFields(req.body, user);

    if (errFillingFields.length || errRequiredFields.length || errForbiddenFields.length) {
        req.valid = false;
        res.err = new Error([...errFillingFields, ...errRequiredFields, ...errForbiddenFields].join("; "))
    }else{
        req.valid = true;
    }

    next();
}

const updateUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during update

    const errFillingFields = Validator.checkFillingFields(req.body, user);
    const errForbiddenFields = Validator.checkForbiddenFields(req.body, user);
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


exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;