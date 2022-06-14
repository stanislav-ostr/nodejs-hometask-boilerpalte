class Validator {
    checkFillingFields(testData, model){

        const validErr = [];

        if (typeof testData !== 'object') {
            validErr.push(`Received data must be object`);
            return validErr;
        }

        for (let prop in model){
            if (prop==='id') continue;

            if (prop in testData) {
                let propValue = testData[prop];

                if (typeof model[prop] !== typeof propValue) {
                    validErr.push(`Field ${prop} hasn't correct type, must be ${typeof model[prop]}`);
                    continue;
                }

                if (!propValue){
                    validErr.push(`Field ${prop} is empty`);
                    continue;
                }

                if (typeof propValue == 'string'){
                    propValue = propValue.trim();
                    if (!propValue){
                        validErr.push(`Field ${prop} is empty`);
                        continue;
                    }
                }

                if (prop==='email'){
                    if (!propValue.match(/^[\w\.]+@gmail\.com$/gm)){
                        validErr.push(`Field ${prop} must be format anyname@gmail.com`);
                        continue;
                    }
                }
                if (prop==='phoneNumber'){
                    if (!propValue.match(/^\+380\d{9}$/gm)){
                        validErr.push(`Field ${prop} must be format +380XXXXXXXXX`);
                        continue;
                    }
                }
                if (prop==='power'){
                    if (!(propValue>=1 && propValue<=100)){
                        validErr.push(`Field ${prop} must be from 1 to 100`);
                        continue;
                    }
                }
                if (prop==='defense'){
                    if (!(propValue>=1 && propValue<=10)){
                        validErr.push(`Field ${prop} must be from 1 to 10`);
                        continue;
                    }
                }
                if (prop==='health'){
                    if (!(propValue>=80 && propValue<=120)){
                        validErr.push(`Field ${prop} must be from 80 to 120`);
                        continue;
                    }
                }
                if (prop==='password'){
                    if (propValue.length<3){
                        validErr.push(`Field ${prop} must be from 3 characters`);
                        continue;
                    }
                }

            }
        }

        return validErr;
    }

    checkRequiredFields(testData, model) {

        const validErr = [];

        if (typeof testData !== 'object') {
            return validErr;
        }

        for (let prop in model) {
            if (prop === 'id') continue;
            if (prop === 'health') continue;

            if (!(prop in testData)) {
                validErr.push(`Field ${prop} is missed`);
            }
        }

        return validErr;
    }

    checkForbiddenFields(testData, model){

        const validErr = [];

        if (typeof testData !== 'object') {
            return validErr;
        }

        for (let prop in testData) {
            if (!(prop in model) || prop === 'id') {
                validErr.push(`Field ${prop} is forbidden`);
            }
        }

        return validErr;
    }

}

module.exports = new Validator()