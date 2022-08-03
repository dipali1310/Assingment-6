import fs from 'fs';
class UserControllerImpl {
    getUsers(req, res) {
        const users = fs.readFileSync('./src/data/users.json', 'utf-8');
        res.status(200).send(JSON.parse(users));
    }
    getUser(req, res) {
        const users = fs.readFileSync('./src/data/users.json', 'utf-8');
        const user = JSON.parse(users).find((u) => u.id === parseInt(req.params.id));
        res.status(200).send(user);
    }
    createUser(req, res) {
        const users = fs.readFileSync('./src/data/users.json', 'utf-8');
        const newUser = req.body;
        console.log(newUser);
        newUser.id = JSON.parse(users).length + 1;
        const newUsers = JSON.parse(users).concat(newUser);
        fs.writeFileSync('./src/data/users.json', JSON.stringify(newUsers));
        res.status(201).send(newUser);
    }
    updateUser(req, res) {
        const users = fs.readFileSync('./src/data/users.json', 'utf-8');
        const updatedUser = req.body;
        updatedUser.id = parseInt(req.params.id);
        const newUsers = JSON.parse(users).map((u) => {
            if (u.id === parseInt(req.params.id)) {
                return updatedUser;
            }
            return u;
        });
        fs.writeFileSync('./src/data/users.json', JSON.stringify(newUsers));
        res.status(200).send(updatedUser);
    }
    deleteUser(req, res) {
        const users = fs.readFileSync('./src/data/users.json', 'utf-8');
        const newUsers = JSON.parse(users).filter((u) => u.id !== parseInt(req.params.id));
        fs.writeFileSync('./src/data/users.json', JSON.stringify(newUsers));
        res.status(200).send(`User with id ${req.params.id} deleted`);
    }
}
export const userController = new UserControllerImpl();
//# sourceMappingURL=userController.js.map