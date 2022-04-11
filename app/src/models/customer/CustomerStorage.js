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

  static async createCustomer(uuid, customerInfo) {
    let conn;

    try {
      conn = await mariadb.getConnection();

      const query = `INSERT INTO customers (id, store_id, name, email, password) VALUES (?, ?, ?, ?, ?);`;

      const flag = await conn.query(query, [
        uuid,
        customerInfo.storeId,
        customerInfo.name,
        customerInfo.email,
        customerInfo.password,
      ]);

      return flag.affectedRows;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async createCustomModel(uuid, customerInfo) {
    let conn;

    try {
      conn = await mariadb.getConnection();

      const query = `INSERT INTO customer_custom_models
      (id ,customer_id, store_id, login_id, phone_number, address, birth_date, gender, recommender)
      VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?);`;

      const flag = await conn.query(query, [
        uuid,
        uuid,
        customerInfo.storeId,
        customerInfo.loginId || null,
        customerInfo.phoneNumber || null,
        customerInfo.address || null,
        customerInfo.birthDate || null,
        customerInfo.gender || null,
        customerInfo.recommender || null,
      ]);

      return flag.affectedRows;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async findOneCustomerByEmail(email) {
    let conn;

    try {
      conn = await mariadb.getConnection();

      const query = `SELECT * FROM customers WHERE email = ?;`;

      const customer = await conn.query(query, [email]);

      return customer[0];
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

      const query = `SELECT store_id AS storeId, login_id AS loginId, phone_number AS phoneNumber, address, birth_date AS birthDate, gender, recommender
      FROM customer_use_flags
      WHERE store_id = ?;`;

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
