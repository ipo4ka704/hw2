import request, { Response } from 'supertest';

import { IUser } from '../models/user.model';
import { userService } from '../services/user.service';
import { app } from '../../index';
import { jwtMiddleware } from '../middlewares/jwt.middleware';
import { Request, NextFunction } from 'express';
import { loggingMiddleware } from '../middlewares/logger';

jest.mock('../middlewares/jwt.middleware');
jest.mock('../middlewares/loggerr');
jest.mock('../middlewares/controller.logger', () => ({
    ControllerLogger: () => (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ): PropertyDescriptor => {
        const originalMethod: any = descriptor.value;
        descriptor.value = async (...args: any): Promise<void> => {
            try {
                await originalMethod.apply(this, args);
            } catch (e) {
                return;
            }
        };

        return descriptor;
    }
}));

describe('UserController', () => {
    beforeEach(() => {
        (loggingMiddleware as jest.Mock).mockImplementation(
            (req: Request, res: Response, next: NextFunction) =>
                new Promise(() => next())
        );
    });

    describe('after auth', () => {
        beforeEach(() => {
            (jwtMiddleware as jest.Mock).mockImplementation(
                (req: Request, res: Response, next: NextFunction) =>
                    new Promise(() => next())
            );
        });

        describe('GET /users/{id}', () => {
            it('should return status 200 with info in the body', async (done: jest.DoneCallback) => {
                const userData: IUser = {
                    id: '2f85eb0-407e-11ea-b467-d7f6bf5cef68',
                    login: 'ivan@stud.com',
                    password: 'password',
                    age: 20,
                    isdeleted: false,
                };
                const getUserByIdSpy: jasmine.Spy = spyOn(
                    userService,
                    'getUserById'
                ).and.returnValue(Promise.resolve(userData));
                const result: request.Response = await request(app)
                    .get('/users/id')
                    .set({ Authorization: 'test token' });
                expect(result.status).toBe(200);
                expect(getUserByIdSpy).toHaveBeenCalledWith('id');
                expect(result.body).toEqual(userData);
                done();
            });

            it('should return status 404 with error in the body', async (done: jest.DoneCallback) => {
                const userData: IUser = (null as unknown) as IUser;
                const getUserByIdSpy: jasmine.Spy = spyOn(
                    userService,
                    'getUserById'
                ).and.returnValue(userData);
                const result: request.Response = await request(app)
                    .get('/users/id')
                    .set({ Authorization: 'test token' });
                expect(result.status).toBe(404);
                expect(getUserByIdSpy).toHaveBeenCalledWith('id');
                expect(result.body).toEqual({
                    message: 'User not found'
                });
                done();
            });

            it('should return status 500 and an error in the body', async (done: jest.DoneCallback) => {
                const getUserByIdSpy: jasmine.Spy = spyOn(
                    userService,
                    'getUserById'
                ).and.throwError('An error from service');
                const result: request.Response = await request(app)
                    .get('/users/id')
                    .set({ Authorization: 'test token' });
                expect(result.status).toBe(500);
                expect(getUserByIdSpy).toHaveBeenCalledWith('id');
                expect(result.body).toEqual({
                    message: 'An error from service'
                });
                done();
            });
        });
    });

});