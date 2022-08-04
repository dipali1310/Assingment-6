
enum Role {
    SUPERADMIN = 'SUPERADMIN',
    ADMIN = 'ADMIN',
    SUBSCRIBER = 'SUBSCRIBER'
}

class User {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phone: string;
    role: Role;
    address: string;

    constructor(element: User) {
        this.id = element.id;
        this.firstName = element.firstName;
        this.middleName = element.middleName;
        this.lastName = element.lastName;
        this.email = element.email;
        this.phone = element.phone;
        this.role = element.role as Role;
        // this.role = element.role==="SUPERADMIN" ? Role.SUPERADMIN : element.role==="ADMIN" ? Role.ADMIN : Role.SUBSCRIBER;
        this.address = element.address;
    }
}

export { User, Role };