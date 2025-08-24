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

    async updateUser(id, userData) {
        const connection = await connectToDatabase(); 
        
        //validasi di kolom userData tidak boleh ada ID 
        if (userData.id) {
            delete userData.id;
        }
    
        //buatkan string dengan format [column] = ? => diisi dengan value
        //pembuatan string tersebut berdasarkan userData
        let updateString = '';
        const values = [];

        Object.keys(userData).forEach(key => {
            //memasukkan column ke updateString
            updateString += `${key} = ?,`

            //memasukkan value ke values
            values.push(userData[key]);
        })

        /*
        {
            *name*: "John Doe",
            *nickname*: "johndoe",
        }
        Hasilnya:
        name
        !koma terakhir harus dihapus
        */
       //menghapus koma
       updateString = updateString.slice(0, -1);

       values.push(id);

       const [result] = await connection.query(`UPDATE users SET ${updateString} WHERE id = ?`, values);

       return result;

    }

    async deleteUser(id) {
        const connection = await connectToDatabase();

        const [result] = await connection.query(`DELETE FROM users WHERE id = ?`,  [id]);

        await connection.end();

        return result;
    }
}

module.exports = new UserModel;