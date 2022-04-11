'use strict';

const mariadb = require('../../config/mairadb');

class CustomerStorage {
  static async createCustomerUseFlag(id, storeId) {
    let conn;

    try {
      conn = await mariadb.getConnection();

      const query = `INSERT INTO customer_use_flags (id, store_id) VALUES (?, ?);`;

      const flag = await conn.query(query, [id, storeId]);

      return flag.affectedRows;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async findOneFlagByName(name) {
    let conn;

    try {
      conn = await mariadb.getConnection();

      const query = `SELECT * FROM customer_use_flags WHERE store_id = ?`;

      const flag = await conn.query(query, [name]);

      return flag[0];
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }
}

module.exports = CustomerStorage;
