import { sequelize } from '../src/server/config/sequelize';
import { UserModel, IUser } from '../src/server/models/user.model';
import { GroupModel, IGroup, Permission } from '../src/server/models/group.model';

sequelize
    .authenticate()
    .then(() => {
        return UserModel.sync({ force: true });
    })
    .then(() => {
        console.log('Connection established successfully.');
        Promise.all(
            users.map(userData => {
                const user = new UserModel(userData);
                return user.save();
            })
        ).then(() => {
            sequelize.close();
        });
    })
    .then(() => {
        return GroupModel.sync({ force: true });
    })
    .then(() => {
        console.log('Connection established successfully.');
        Promise.all(
            groups.map((groupData: IGroup) => {
                const group: GroupModel = new GroupModel(groupData);
                return group.save();
            })
        ).then(() => {
            sequelize.close();
        });
    })
    .catch((err: Error) => {
        console.error('Unable to connect to the database:', err);
        sequelize.close();
    });

const users: IUser[] = [
    {
        id: '2f85eb0-407e-11ea-b467-d7f6bf5cef68',
        login: 'test1',
        password: 'password',
        age: 20,
        isDeleted: false
    },
    {
        id: '02f85eb1-407e-11ea-b467-d7f6bf5cef68',
        login: 'test2',
        password: 'password',
        age: 20,
        isDeleted: false
    },
    {
        id: '2f85eb2-407e-11ea-b467-d7f6bf5cef68',
        login: 'test3',
        password: 'password',
        age: 20,
        isDeleted: false
    },
    {
        id: '02f85eb3-407e-11ea-b467-d7f6bf5cef68',
        login: 'test4',
        password: 'password',
        age: 20,
        isDeleted: false
    },
    {
        id: '02f85eb4-407e-11ea-b467-d7f6bf5cef68',
        login: 'test5',
        password: 'password',
        age: 20,
        isDeleted: false
    },
    {
        id: '2f85eb5-407e-11ea-b467-d7f6bf5cef68',
        login: 'test6',
        password: 'password',
        age: 20,
        isDeleted: false
    },
    {
        id: '02f85eb6-407e-11ea-b467-d7f6bf5cef68',
        login: 'test26',
        password: 'password',
        age: 20,
        isDeleted: false
    },
    {
        id: '02f85eb7-407e-11ea-b467-d7f6bf5cef68',
        login: 'test27',
        password: 'password',
        age: 20,
        isDeleted: false
    },
];


const groups: IGroup[] = [
    {
        id: 'ca2278d0-4b38-11ea-9d6c-e99a947f6918',
        name: 'group1',
        permissions: [Permission.Write]
    },
    {
        id: 'ca2278d1-4b38-11ea-9d6c-e99a947f6918',
        name: 'group2',
        permissions: [Permission.Write, Permission.Delete]
    },
    {
        id: 'ca2278d3-4b38-11ea-9d6c-e99a947f6918',
        name: 'group3',
        permissions: [Permission.Read, Permission.Share]
    },
    {
        id: 'ca2278d2-4b38-11ea-9d6c-e99a947f6918',
        name: 'group4',
        permissions: [Permission.Write, Permission.UploadFiles, Permission.Delete]
    }
];

