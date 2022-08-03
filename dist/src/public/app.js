var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Role } from '../models/user.js';
import { userService } from '../userservice/Userservice.js';
function dateTimeDC(target, propertyKey) {
    Reflect.defineProperty(target, propertyKey, {
        get: () => {
            return new Date().toLocaleString();
        }
    });
}
class App {
    constructor() {
        this.loadBtn = document.getElementById("load-btn");
        this.refreshBtn = document.getElementById("refresh-btn");
        this.hostElement = document.getElementById("table-container");
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loadBtn.addEventListener("click", this.loadUsers.bind(this));
            this.refreshBtn.addEventListener("click", this.refreshUsers.bind(this));
            this.refreshBtn.style.display = "none";
        });
    }
    hookEvents() {
        const editBtns = document.getElementsByClassName("edtBtn");
        const saveBtns = document.getElementsByClassName("saveBtn");
        const cancelBtns = document.getElementsByClassName("canBtn");
        const deleteBtns = document.getElementsByClassName("delBtn");
        const addUserBtn = document.getElementById("add-user");
        for (let i = 0; i < editBtns.length; i++) {
            editBtns[i].addEventListener("click", this.editUser.bind(this));
        }
        for (let i = 0; i < saveBtns.length; i++) {
            saveBtns[i].addEventListener("click", this.saveUser.bind(this));
            let saveBtn = saveBtns[i];
            saveBtn.style.display = "none";
        }
        for (let i = 0; i < cancelBtns.length; i++) {
            cancelBtns[i].addEventListener("click", this.cancelUser.bind(this));
            let cancelBtn = cancelBtns[i];
            cancelBtn.style.display = "none";
        }
        for (let i = 0; i < deleteBtns.length; i++) {
            deleteBtns[i].addEventListener("click", this.deleteUser.bind(this));
        }
        addUserBtn.addEventListener("click", this.addUser.bind(this));
    }
    loadUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loadBtn.style.display = "none";
            this.refreshBtn.style.display = "block";
            const users = yield userService.find();
            this.hostElement.innerHTML = this.render();
            this.renderTable(users);
            document.getElementsByTagName("footer")[0].innerHTML = `Date: ${this.date}`;
        });
    }
    render() {
        return `
    <div class="container">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Middle Name</th> 
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Address</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody id="users-table">
            </tbody>
          </table>
          <button id="add-user">Add New User</button>
    </div>
    `;
    }
    renderTable(users) {
        const usersTable = document.getElementById("users-table");
        usersTable.innerHTML = "";
        users.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `
      <td>${user.firstName}</td>
      <td>${user.middleName}</td>
      <td>${user.lastName}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
      <td>
        <select class="form-control" id="role-select" disabled>
          <option value="${Role.SUPERADMIN}" ${user.role === Role.SUPERADMIN ? "selected" : ""}>SuperAdmin</option>
          <option value="${Role.ADMIN}" ${user.role === Role.ADMIN ? "selected" : ""}>Admin</option>
          <option value="${Role.SUBSCRIBER}" ${user.role === Role.SUBSCRIBER ? "selected" : ""}>Subscriber</option>
        </select>
      </td>
      <td>${user.address}</td>
      <td>
        <button class="btn edtBtn">Edit</button>
        <button class="btn delBtn">Delete</button>
        <button class="btn saveBtn">Save</button>
        <button class="btn canBtn">Cancel</button>
      </td>
      `;
            usersTable.appendChild(row);
        });
        this.hookEvents();
    }
    editUser(event) {
        const editBtn = event.target;
        const row = editBtn.parentElement.parentElement;
        row.contentEditable = "true";
        editBtn.parentElement.contentEditable = "false";
        const select = row.getElementsByTagName("select")[0];
        select.removeAttribute("disabled");
        editBtn.style.display = "none";
        const saveBtn = row.getElementsByClassName("saveBtn")[0];
        const cancelBtn = row.getElementsByClassName("canBtn")[0];
        const deleteBtn = row.getElementsByClassName("delBtn")[0];
        deleteBtn.style.display = "none";
        saveBtn.style.display = "block";
        cancelBtn.style.display = "block";
    }
    saveUser(event) {
        const saveBtn = event.target;
        const row = saveBtn.parentElement.parentElement;
        const select = row.getElementsByTagName("select")[0];
        const role = select.value;
        const user = {
            id: -1,
            firstName: row.getElementsByTagName("td")[0].innerText,
            middleName: row.getElementsByTagName("td")[1].innerText,
            lastName: row.getElementsByTagName("td")[2].innerText,
            email: row.getElementsByTagName("td")[3].innerText,
            phone: row.getElementsByTagName("td")[4].innerText,
            role: role,
            address: row.getElementsByTagName("td")[6].innerText
        };
        row.contentEditable = "false";
        console.log(userService.update(user));
        saveBtn.style.display = "none";
        const editBtn = row.getElementsByClassName("edtBtn")[0];
        const deleteBtn = row.getElementsByClassName("delBtn")[0];
        const cancelBtn = row.getElementsByClassName("canBtn")[0];
        editBtn.style.display = "block";
        deleteBtn.style.display = "block";
        cancelBtn.style.display = "none";
    }
    cancelUser(event) {
        const cancelBtn = event.target;
        const row = cancelBtn.parentElement.parentElement;
        row.contentEditable = "false";
        const select = row.getElementsByTagName("select")[0];
        select.setAttribute("disabled", "true");
        const editBtn = row.getElementsByClassName("edtBtn")[0];
        const saveBtn = row.getElementsByClassName("saveBtn")[0];
        const deleteBtn = row.getElementsByClassName("delBtn")[0];
        editBtn.style.display = "block";
        saveBtn.style.display = "none";
        deleteBtn.style.display = "block";
        cancelBtn.style.display = "none";
    }
    deleteUser(event) {
        const deleteBtn = event.target;
        const row = deleteBtn.parentElement.parentElement;
        const select = row.getElementsByTagName("select")[0];
        const role = select.value;
        const user = {
            id: null,
            firstName: row.getElementsByTagName("td")[0].innerText,
            middleName: row.getElementsByTagName("td")[1].innerText,
            lastName: row.getElementsByTagName("td")[2].innerText,
            email: row.getElementsByTagName("td")[3].innerText,
            phone: row.getElementsByTagName("td")[4].innerText,
            role: role,
            address: row.getElementsByTagName("td")[6].innerText
        };
        userService.delete(user);
        this.refreshUsers();
    }
    //Adding user data
    addUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const trElement = document.createElement("tr");
            trElement.innerHTML = `
    <td><input type="text" class="form-control" id="first-name-input" placeholder="First Name" ></td>
    <td><input type="text" class="form-control" id="middle-name-input" placeholder="Middle Name" ></td>
    <td><input type="text" class="form-control" id="last-name-input" placeholder="Last Name" ></td>
    <td><input type="email" class="form-control" id="email-input" placeholder="Email" ></td>
    <td><input type="tel" class="form-control" id="phone-input" placeholder="Phone" ></td>
    <td>
      <select class="form-control" id="role-select" >
        <option value="${Role.SUPERADMIN}">SuperAdmin</option>
        <option value="${Role.ADMIN}">Admin</option>
        <option value="${Role.SUBSCRIBER}" selected>Subscriber</option>
      </select>
    </td>
    <td><input type="text" class="form-control" id="address-input" placeholder="Address" ></td>
    <td>
      <button class="btn btn-add-user">Save</button>
      <button class="btn delBtn">Cancel</button>
    </td>
    `;
            const usersTable = document.getElementById("users-table");
            usersTable.appendChild(trElement);
            this.hookEvents();
            const saveBtn = trElement.getElementsByClassName("btn-add-user")[0];
            saveBtn.addEventListener("click", this.createUser.bind(this));
        });
    }
    createUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const firstName = document.getElementById("first-name-input");
            const middleName = document.getElementById("middle-name-input");
            const lastName = document.getElementById("last-name-input");
            const email = document.getElementById("email-input");
            const phone = document.getElementById("phone-input");
            const role = document.getElementById("role-select");
            const address = document.getElementById("address-input");
            const user = {
                id: null,
                firstName: firstName.value,
                middleName: middleName.value,
                lastName: lastName.value,
                email: email.value,
                phone: phone.value,
                role: role.value,
                address: address.value
            };
            userService.save(user);
            this.refreshUsers();
        });
    }
    refreshUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield userService.find();
            this.hostElement.innerHTML = "";
            setTimeout(() => {
                this.hostElement.innerHTML = this.render();
                this.renderTable(users);
            }, 100);
            document.getElementsByTagName("footer")[0].innerHTML = `Date: ${this.date}`;
        });
    }
}
__decorate([
    dateTimeDC
], App.prototype, "date", void 0);
new App();
//# sourceMappingURL=app.js.map