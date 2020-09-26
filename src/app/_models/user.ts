export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
    role:string;
}
export class UserList {
    id: number;
    username: string;
    role:string;
    loginTime: string;
    logoutTime: string;
    constructor(   id: number,
        username: string,
        role:string,
        loginTime: string,
        logoutTime: string,){
            this.id= id;
            this.username= username;
            this.role= role;
            this.loginTime= loginTime;
            this.logoutTime= logoutTime;
    }
}