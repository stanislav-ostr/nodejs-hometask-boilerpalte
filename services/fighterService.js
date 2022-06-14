const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
    // TODO: Implement methods to work with fighters

    search(search) {
        const item = FighterRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }

    getAll(){
        const items = FighterRepository.getAll();
        if(!items) {
            return null;
        }
        return items;
    }

    create(data){
        let foundFighter = FighterRepository.find('name', data.name);
        if (foundFighter) throw new Error(`Fighter with name ${data.name} already exist`);

        const item = FighterRepository.create(data);
        if(!item) {
            return null;
        }
        return item;
    }

    update(id, data){
        const item = FighterRepository.update(id, data);
        if(!item) {
            return null;
        }
        return item;
    }

    delete(id){
        const item = FighterRepository.delete(id);
        if(!item) {
            return null;
        }
        return item;
    }
}

module.exports = new FighterService();