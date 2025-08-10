const { connectToDatabase } = require(".");

class UserModel {

    async getUsers() {
        const connection = await connectToDatabase();

        const [users] = await connection.query("SELECT * from users");

        await connection.end();

        return users;
    }

    async getUserbyID(id) {
        const connection = await connectToDatabase();

        const [users] = await connection.query(`SELECT * from users WHERE id=${id}`);

        console.log("Users:", users);

        await connection.end();

        return users; 
    }

    async createUser(userData) {
        const {name, email, nickname, password} = userData;

        const connection = await connectToDatabase();

        const [result] = await connection.query(`
        INSERT INTO
            users (name, email, nickname, password)
         VALUES (?, ?, ?, ?)`, 
            [name, email, nickname, password]
        );

        return result;  
    }
}

module.exports = new UserModel;