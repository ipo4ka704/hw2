import { groupService } from  "../services/group.service"
import { UserGroupService } from  "../services/user-group.service"
async function getAll(req, res, next) {
    try {
        const Groups = await groupService.getAllGroups();
        return res.status(200).json(Groups);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
async function get(req, res, next) {
    try {
        const Group = await groupService.getGroupById(req.params.id);
        Group
            ? res.status(200).json(Group)
            : res.status(404).json({ mesage: 'Group not found' });
    } catch (err) {
        res.status(500).json({ mesage: err.mesage });
    }
}

async function create(req, res, next) {
    const Group = req.body;
    try {
        const addedGroup = await groupService.addGroup(Group);
        return res.status(201).json(addedGroup);
    } catch (err) {
        res.status(500).json({ mesage: err.mesage });
    }
}

async function update(req, res, next) {
    const updatedGroup = req.body;
    try {
        const Group = await groupService.updateGroup(updatedGroup, req.params.id);
        if (!Group) return res.status(404).json({ mesage: 'Group not found' });
        return res.status(200).json(Group);
    } catch (err) {
        res.status(500).json({ mesage: err.mesage });
    }
}

async function remove(req, res, next) {
    try {
        const numberOfDeletedGroups = await groupService.deleteGroup(
            req.params.id
        );
        if (!numberOfDeletedGroups || numberOfDeletedGroups < 1)
            return res.status(404).json({ mesage: 'Group not found' });
        return res.status(200).json({ message: 'The group was deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function addUsersToGroup(req, res, next) {
    try {
        const a = await UserGroupService.addUsersToGroup(
            req.params.id,
            req.body.userIds
        );
        if (!a) return res.status(404).json({ mesage: 'Group not found' });
        return res
            .status(200)
            .json({ message: 'The users was added to the group' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


export const groupController = {
    getAll,
    get,
    create,
    update,
    remove,
    addUsersToGroup
};