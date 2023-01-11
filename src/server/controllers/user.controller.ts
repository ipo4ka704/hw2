import { v4 as uuidv4 } from 'uuid';
import User from '../models/User.model'
const users = User.getAll();
async function getAll(req, res, next) {
    try {
        const loginSubstring = req.query['loginSubstring'];
        const limit = req.query['limit'];
        const list = users
            .filter(user => user.login.includes(loginSubstring) && !user.isDeleted)
            .sort((a, b) => a.login.localeCompare(b.login))
            .slice(0, limit);

        res.send(list);
    } catch (err) {
        console.error(`Error while getting programming languages`, err.message);
        next(err);
    }
}
async function get(req, res, next) {
    try {
        const id = req.params.id;
        const userToFind = users.find(user => user.id === id);

        if (!userToFind) {
            res.status(404).send('User not found');
        }

        res.send(userToFind);
    } catch (err) {
        console.error(`Error while getting user`, err.message);
        next(err);
    }
}

async function create(req, res, next) {
    try {
        const user = new User(uuidv4(), req.body.login, req.body.password, req.body.age, false);
        user.save();
        res.status(201).send(user);

    } catch (err) {
        console.error(`Error while creating user`, err.message);
        next(err);
    }
}

async function update(req, res, next) {
    try {
        const id = req.params.id;
        const user = req.body;
        const userToUpdate  = User.update(id, user);
        if (!userToUpdate ) {
            res.status(404).send('User not found');
        } else {
            res.send(userToUpdate);
        }
    } catch (err) {
        console.error(`Error while updating user`, err.message);
        next(err);
    }
}

async function remove(req, res, next) {
    try {
        const id = req.params.id;
        const userToDelete = User.find(id);
        if (!userToDelete || userToDelete.isDeleted) {
            res.status(404).send('User is not found');
        } else {
            userToDelete.isDeleted = true;
            userToDelete.save();
            res.status(204).send();
        }
    } catch (err) {
        console.error(`Error while deleting user`, err.message);
        next(err);
    }
}

export default  {
    getAll,
    get,
    create,
    update,
    remove
};