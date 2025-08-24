const { connectToDatabase } = require('./index');

async function getAllTodos() {
  const conn = await connectToDatabase();
  try {
    const [rows] = await conn.query(
      `SELECT t.*, c.name AS category_name
       FROM todos t
       LEFT JOIN categories c ON c.id = t.category_id
       ORDER BY t.id DESC`
    );
    return rows;
  } finally {
    await conn.end();
  }
}

async function getTodoById(id) {
  const conn = await connectToDatabase();
  try {
    const [rows] = await conn.query(
      `SELECT t.*, c.name AS category_name
       FROM todos t
       LEFT JOIN categories c ON c.id = t.category_id
       WHERE t.id = ?`,
      [id]
    );
    return rows[0] || null;
  } finally {
    await conn.end();
  }
}

async function createTodo({ title, description = null, category_id = null, is_done = 0 }) {
  const conn = await connectToDatabase();
  try {
    const [res] = await conn.execute(
      'INSERT INTO todos (title, description, category_id, is_done) VALUES (?,?,?,?)',
      [title, description, category_id, is_done ? 1 : 0]
    );
    return { id: res.insertId, title, description, category_id, is_done: !!is_done };
  } finally {
    await conn.end();
  }
}

async function updateTodo(id, { title, description = null, category_id = null, is_done = 0 }) {
  const conn = await connectToDatabase();
  try {
    const [res] = await conn.execute(
      'UPDATE todos SET title = ?, description = ?, category_id = ?, is_done = ? WHERE id = ?',
      [title, description, category_id, is_done ? 1 : 0, id]
    );
    return res.affectedRows > 0;
  } finally {
    await conn.end();
  }
}

async function deleteTodo(id) {
  const conn = await connectToDatabase();
  try {
    const [res] = await conn.execute('DELETE FROM todos WHERE id = ?', [id]);
    return res.affectedRows > 0;
  } finally {
    await conn.end();
  }
}

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
