const { connectToDatabase } = require(".");

class CategoryModel {

    async getCategories() {
        const connection = await connectToDatabase();

        const [categories] = await connection.query("SELECT * from categories");

        await connection.end();

        return categories;
    }

    async getCategoryById(id) {
        const connection = await connectToDatabase();

        const [categories] = await connection.query(`SELECT * from categories WHERE id=${id}`);

        console.log("Categories:", categories);

        await connection.end();

        return categories; 
    }

    async createCategory(categoryData) {
        const {kategori_name, created_at} = categoryData;

        const connection = await connectToDatabase();

        const [result] = await connection.query(`
        INSERT INTO
            categories (kategori_name, created_at)
         VALUES (?, ?)`, 
            [kategori_name, created_at]
        );

        return result;  
    }

    async updateCategory(id, categoryData) {
        const connection = await connectToDatabase(); 

        //validasi di kolom categoryData tidak boleh ada ID 
        if (categoryData.id) {
            delete categoryData.id;
        }
    
        //buatkan string dengan format [column] = ? => diisi dengan value
        //pembuatan string tersebut berdasarkan categoryData
        let updateString = '';
        const values = [];

        Object.keys(categoryData).forEach(key => {
            //memasukkan column ke updateString
            updateString += `${key} = ?,`

            //memasukkan value ke values
            values.push(categoryData[key]);
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

       const [result] = await connection.query(`UPDATE categories SET ${updateString} WHERE id = ?`, values);

       return result;

    }

    async deleteCategory(id) {
        const connection = await connectToDatabase();

        const [result] = await connection.query(`DELETE FROM categories WHERE id = ?`,  [id]);

        await connection.end();

        return result;
    }
}

module.exports = new CategoryModel;