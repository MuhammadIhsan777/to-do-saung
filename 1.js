const mysql = require('mysql2/promise');
const DB = require('./config/config');

async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: DB.DB_HOST,
      user: DB.DB_USER,
      password: DB.DB_PASSWORD,
      database: DB.DB_NAME,
      port: DB.DB_PORT
    });
    console.log('Connected to the database');
    return connection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

const main = async () => {
    const connection = await connectToDatabase();

    const [users] = await connection.query('SELECT * from users');
    console.log('Users:', users);

    const [combinedTodos] = await connection.query(`
      SELECT 
	todos.id,
	todos.title,
	todos.description,
	todos.is_completed,
	todos.due_date,
	todos.user_id,
	users.name AS user_name
FROM
	todos 
	JOIN users ON users.id = todos.user_id
WHERE 
	user_id=1;`);
    console.log('Todos:', combinedTodos);

    await connection.end();
};

main();