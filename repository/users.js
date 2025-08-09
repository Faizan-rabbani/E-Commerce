import fs from 'fs';

class UsersRepository{
    constructor(filename){
        if(!filename){
            throw new Error('Filename is required to create a repository');
        }

        this.filename = filename
        try{
            fs.accessSync(this.filename)
        }
        catch(err){
            fs.writeFileSync(this.filename, '[]');
        }
    }

    async checkForFile(){

    }
}

const repo = new UsersRepository('users.json')