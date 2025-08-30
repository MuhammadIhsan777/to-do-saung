const { connectToDatabase } = require(".");

class TodoModel {

    async getTodos() {
        const connection = await connectToDatabase();

        const [todos] = await connection.query("SELECT * from todos");

        await connection.end();

        return todos;
    }

    async getTodoById(id) {
        const connection = await connectToDatabase();

        const [todos] = await connection.query(`SELECT * from todos WHERE id=${id}`);

        console.log("Todos:", todos);

        await connection.end();

        return todos; 
    }

    async createTodo(todoData) {
        const {title, description} = todoData;

        const connection = await connectToDatabase();

        const [result] = await connection.query(`
        INSERT INTO
            todos (title, description)
         VALUES (?, ?)`, 
            [title, description]
        );

        return result;  
    }

    async updateTodo(id, todoData) {
        const connection = await connectToDatabase(); 

        //validasi di kolom todoData tidak boleh ada ID 
        if (todoData.id) {
            delete todoData.id;
        }
    
        //buatkan string dengan format [column] = ? => diisi dengan value
        //pembuatan string tersebut berdasarkan todoData
        let updateString = '';
        const values = [];

        Object.keys(todoData).forEach(key => {
            //memasukkan column ke updateString
            updateString += `${key} = ?,`

            //memasukkan value ke values
            values.push(todoData[key]);
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

       const [result] = await connection.query(`UPDATE todos SET ${updateString} WHERE id = ?`, values);

       return result;

    }

    async deleteTodo(id) {
        const connection = await connectToDatabase();

        const [result] = await connection.query(`DELETE FROM todos WHERE id = ?`,  [id]);

        await connection.end();

        return result;
    }
}



// ⛳️ PENTING: export INSTANCE, bukan kelasnya
module.exports = new TodoModel();