export class User {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public image?: string,
        public role: string = 'ROLE_USER',
        public google?: boolean,
        public _id?: string
    ) { }
}
