import { User } from "../models/user";
import { IUserService } from "./iuserservice";
// import data from "../data/users.json" assert {"type": "json"};

class UserService implements IUserService<User> {

    users: User[];

    async find(): Promise<User[]> {
        const url = `http://localhost:2000/api/users`;
        await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => this.users = data)
        .catch(err => console.log(err));
        return this.users;
    }

    async save(user: User): Promise<User> {
        this.find();
        user.id = this.users.length + 1;
        const url = `http://localhost:2000/api/createUser`;
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
        return user;
    }

    async update(user: User): Promise<User> {
        this.find();
        this.users.map((element: User) => {
            if (element.email === user.email) {
                user.id = element.id;
            }
        });
        const url = `http://localhost:2000/api/updateUser/${user.id}`;
        await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(user)
        }).then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));

        return user;
    }

    async delete(user: User): Promise<User> {
        this.users.map((element: User) => {
            if (element.email === user.email) {
                user.id = element.id;
            }
        });

        const url = `http://localhost:2000/api/deleteUser/${user.id}`;
        await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(data => console.log(data))
        .catch(err => console.log(err));

        return user;
    }
}

export const userService = new UserService();