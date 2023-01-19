import { userService } from  "../services/user.service"
async function getAll(req, res, next) {
    try {
        const { loginSubstring = '', limit = 10 } = req.query;
        const users = await userService.getAllUsers(loginSubstring, limit);
        return res.status(200).json(users);
    } catch (err) {
        console.error(`Error while getting programming languages`, err.message);
        next(err);
    }
}
async function get(req, res, next) {
    try {
        const userToFind = userService.getUserById(req.params.id);

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
        const addedUser = await userService.addUser(req.body);
        return res.status(201).json(addedUser);
    } catch (err) {
        console.error(`Error while creating user`, err.message);
        next(err);
    }
}

async function update(req, res, next) {
    const updatedUser = req.body;
    try {
        const user = await userService.updateUser(updatedUser, req.params.id);
        if (!user) return res.status(404).json({ mesage: 'User not found' });
        return res.status(200).json(user);
    } catch (err) {
        console.error(`Error while updating user`, err.message);
        next(err);
    }
}

async function remove(req, res, next) {
    try {
        const deletedUser = await userService.deleteUser(req.params.id);
        if (!deletedUser)
            return res.status(404).json({ mesage: 'User not found' });
        return res.status(200).json(deletedUser);
    } catch (err) {
        console.error(`Error while deleting user`, err.message);
        next(err);
    }
}

export const userController = {
    getAll,
    get,
    create,
    update,
    remove
};