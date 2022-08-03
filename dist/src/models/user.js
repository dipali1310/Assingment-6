var Role;
(function (Role) {
    Role["SUPERADMIN"] = "SUPERADMIN";
    Role["ADMIN"] = "ADMIN";
    Role["SUBSCRIBER"] = "SUBSCRIBER";
})(Role || (Role = {}));
class User {
    constructor(element) {
        this.id = element.id;
        this.firstName = element.firstName;
        this.middleName = element.middleName;
        this.lastName = element.lastName;
        this.email = element.email;
        this.phone = element.phone;
        this.role = element.role;
        // this.role = element.role==="SUPERADMIN" ? Role.SUPERADMIN : element.role==="ADMIN" ? Role.ADMIN : Role.SUBSCRIBER;
        this.address = element.address;
    }
}
export { User, Role };
//# sourceMappingURL=user.js.map