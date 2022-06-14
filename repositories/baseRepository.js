const { dbAdapter } = require('../config/db');
const { v4 } = require('uuid');


class BaseRepository {
    constructor(collectionName) {
        this.dbContext = dbAdapter.get(collectionName);
        this.collectionName = collectionName;
    }

    generateId() {
        return v4();
    }

    getAll() {
        return this.dbContext.value();
    }

    find(field, value) {
        const items = this.dbContext.value();
        const findItem = items.find((el)=> {
            if (typeof value === 'string'){
                return (el[field].toLowerCase() === value.toLowerCase());
            }else{
                return (el[field] === value);
            }
        });

        return findItem;
    }

    getOne(search) {
        return this.dbContext.find(search).value();
    }

    create(data) {
        data.id = this.generateId();
        data.createdAt = new Date();
        const list = this.dbContext.push(data).write();
        return list.find(it => it.id === data.id);
    }

    update(id, dataToUpdate) {
        dataToUpdate.updatedAt = new Date();
        return this.dbContext.find({ id }).assign(dataToUpdate).write();
    }

    delete(id) {
        return this.dbContext.remove({ id }).write();
    }
}

exports.BaseRepository = BaseRepository;