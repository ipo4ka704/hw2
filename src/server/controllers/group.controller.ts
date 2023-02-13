import { groupService } from  "../services/group.service"
import { UserGroupService } from  "../services/user-group.service"
import {ControllerLogger} from "../middlewares/controller.logger";
import {NextFunction, Request, Response} from "express";

export class groupController {
    @ControllerLogger()
    public static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const Groups = await groupService.getAllGroups();
            res.status(200).json(Groups);
        } catch (err) {
            return next(err);
        }
    }
    @ControllerLogger()
    public static async get(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const Group = await groupService.getGroupById(req.params.id);
            Group
                ? res.status(200).json(Group)
                : res.status(404).json({ mesage: 'Group not found' });
        } catch (err) {
            return next(err);
        }
    }

    @ControllerLogger()
    public static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        const Group = req.body;
        try {
            const addedGroup = await groupService.addGroup(Group);
            res.status(201).json(addedGroup);
        } catch (err) {
          return next(err);
        }
    }

    @ControllerLogger()
    public static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        const updatedGroup = req.body;
        try {
            const Group = await groupService.updateGroup(updatedGroup, req.params.id);
            if (!Group) res.status(404).json({ mesage: 'Group not found' });
            res.status(200).json(Group);
        } catch (err) {
            return next(err);
        }
    }
    @ControllerLogger()
    public static async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const numberOfDeletedGroups = await groupService.deleteGroup(
                req.params.id
            );
            if (!numberOfDeletedGroups || numberOfDeletedGroups < 1)
                res.status(404).json({ mesage: 'Group not found' });
             res.status(200).json({ message: 'The group was deleted' });
        } catch (err) {
            return next(err);
        }
    }
    @ControllerLogger()
    public static async addUsersToGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const a = await UserGroupService.addUsersToGroup(
                req.params.id,
                req.body.userIds
            );
            if (!a) res.status(404).json({ mesage: 'Group not found' });
            res.status(200)
                .json({ message: 'The users was added to the group' });
        } catch (err) {
            return next(err);
        }
    }
}

