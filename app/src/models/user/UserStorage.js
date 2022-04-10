'use strict';

const mariadb = require('../../config/mairadb');

class UserStorage {
  static async findOneById(id) {
    let conn;

    try {
      conn = await mariadb.getConnection();

      const query = `SELECT id FROM stores WHERE id = ?;`;

      const existId = await conn.query(query, [id]);

      return existId[0];
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async findOneByEmail(email) {
    let conn;

    try {
      conn = await mariadb.getConnection();

      const query = `SELECT email FROM stores WHERE email = ?;`;

      const existEmail = await conn.query(query, [email]);

      return existEmail[0];
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async findOneByStoreName(storeName) {
    let conn;

    try {
      conn = await mariadb.getConnection();

      const query = `SELECT name FROM stores WHERE name = ?;`;

      const existStoreName = await conn.query(query, [storeName]);

      return existStoreName[0];
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async createUser(userInfo) {
    let conn;

    try {
      conn = await mariadb.getConnection();

      const query = `INSERT INTO stores (id, name, email, password) VALUES (?, ?, ?, ?);`;

      const user = await conn.query(query, [
        userInfo.id,
        userInfo.storeName,
        userInfo.email,
        userInfo.password,
      ]);

      return user.affectedRows;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }
}

module.exports = UserStorage;
