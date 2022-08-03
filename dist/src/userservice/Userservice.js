var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import data from "../data/users.json" assert {"type": "json"};
class UserService {
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `http://localhost:2000/api/users`;
            yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => this.users = data)
                .catch(err => console.log(err));
            return this.users;
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            this.find();
            user.id = this.users.length + 1;
            const url = `http://localhost:2000/api/createUser`;
            yield fetch(url, {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(res => res.json())
                .then(data => console.log(data))
                .catch(err => console.log(err));
            return user;
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            this.find();
            this.users.map((element) => {
                if (element.email === user.email) {
                    user.id = element.id;
                }
            });
            const url = `http://localhost:2000/api/updateUser/${user.id}`;
            yield fetch(url, {
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
        });
    }
    delete(user) {
        return __awaiter(this, void 0, void 0, function* () {
            this.users.map((element) => {
                if (element.email === user.email) {
                    user.id = element.id;
                }
            });
            const url = `http://localhost:2000/api/deleteUser/${user.id}`;
            yield fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
                .then(data => console.log(data))
                .catch(err => console.log(err));
            return user;
        });
    }
}
export const userService = new UserService();
//# sourceMappingURL=Userservice.js.map