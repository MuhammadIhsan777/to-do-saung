const { connectToDatabase } = require('./index');

async function getAllCategories() {
  const conn = await connectToDatabase();
  try {
    const [rows] = await conn.query('SELECT * FROM categories ORDER BY id DESC');
    return rows;
  } finally {
    await conn.end();
  }
}

async function getCategoryById(id) {
  const conn = await connectToDatabase();
  try {
    const [rows] = await conn.query('SELECT * FROM categories WHERE id = ?', [id]);
    return rows[0] || null;
  } finally {
    await conn.end();
  }
}

async function createCategory({ name }) {
  const conn = await connectToDatabase();
  try {
    const [res] = await conn.execute('INSERT INTO categories (name) VALUES (?)', [name]);
    return { id: res.insertId, name };
  } finally {
    await conn.end();
  }
}

async function updateCategory(id, { name }) {
  const conn = await connectToDatabase();
  try {
    const [res] = await conn.execute('UPDATE categories SET name = ? WHERE id = ?', [name, id]);
    return res.affectedRows > 0;
  } finally {
    await conn.end();
  }
}

async function deleteCategory(id) {
  const conn = await connectToDatabase();
  try {
    const [res] = await conn.execute('DELETE FROM categories WHERE id = ?', [id]);
    return res.affectedRows > 0;
  } finally {
    await conn.end();
  }
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
