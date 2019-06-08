const db = require('../../data/dbConfig');

module.exports = {
  getUsers,
  getUserById,
  getUserBy,
  addUser,
}

function getUsers() {
  return db('users');
}

async function addUser(user) {
  const [id] = await db('users')
    .insert(user, 'id');

  return getUserById(id);
}

function getUserById(id) {
  return db('users')
    .where({ id })
    .first();
}

function getUserBy(column) {
  return db('users')
    .where(column)
    .first();
}
