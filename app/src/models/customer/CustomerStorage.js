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
}

module.exports = CustomerStorage;
