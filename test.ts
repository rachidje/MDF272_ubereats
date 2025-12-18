class User {
    constructor(
        private firstname: string,
        private lastname: string
    ){}
}

class Project {
    constructor(
        private name: string,
        private owner: User
    ){}

    isOwnBy(user: User) {
        return this.owner === user
    }
}

const john = new User('John', 'Doe');
const alice = new User('Alice', 'Smith');
const project = new Project('API REST', john);

if(project.isOwnBy(alice)) {
    
}