const { UserRepository } = require('../repositories/userRepository');

class UserService {

    // TODO: Implement methods to work with user

    search(search) {
        const item = UserRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }

    getAll(){
        const items = UserRepository.getAll();
        if(!items) {
            return null;
        }
        return items;
    }

    create(data){
        let foundUser = UserRepository.find('email', data.email);
        if (foundUser) throw new Error(`User with email ${data.email} already exist`);

        foundUser = UserRepository.find('phoneNumber', data.phoneNumber);
        if (foundUser) throw new Error(`User with phone number ${data.phoneNumber} already exist`);

        const item = UserRepository.create(data);
        if(!item) {
            return null;
        }
        return item;
    }

    update(id, data){
        const item = UserRepository.update(id, data);
        if(!item) {
            return null;
        }
        return item;
    }

    delete(id){
        const item = UserRepository.delete(id);
        if(!item) {
            return null;
        }
        return item;
    }
}

module.exports = new UserService();