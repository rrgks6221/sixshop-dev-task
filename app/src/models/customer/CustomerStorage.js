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

  static async findOneSignedCustomer(id) {
    let conn;

    try {
      conn = await mariadb.getConnection();

      const query = `SELECT customers.id, customers.name, customers.password FROM customers
      JOIN customer_custom_models
      WHERE email = ?
      OR
      customer_custom_models.login_id = ?;`;

      const customer = await conn.query(query, [id, id]);

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

  static async findOnePasswordById(id) {
    let conn;

    try {
      conn = await mariadb.getConnection();

      const query = `SELECT password FROM customers WHERE id = ?`;

      const customer = await conn.query(query, [id]);

      return customer[0].password;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async updatePassword(id, password) {
    let conn;

    try {
      conn = await mariadb.getConnection();

      const query = `UPDATE customers SET password = ? WHERE id = ?;`;

      const isUpdate = await conn.query(query, [password, id]);

      return isUpdate.affectedRows;
    } catch (err) {
      throw err;
    } finally {
      conn.release();
    }
  }

  static async updateCustomerUseFlag(id, flags) {
    let conn;

    try {
      conn = await mariadb.getConnection();

      const query = `UPDATE customer_use_flags SET
      login_id = ?,
      phone_number = ?,
      address = ?,
      birth_date = ?,
      gender = ?,
      recommender = ?,
      reserve = ?,
      purchase_count = ?,
      purchase_amount = ?
      WHERE store_id = ?;`;

      const isUpdate = await conn.query(query, [
        flags.loginId,
        flags.phoneNumber,
        flags.address,
        flags.birthDate,
        flags.gender,
        flags.recommender,
        flags.reserve,
        flags.purchaseCount,
        flags.purchaseAmount,
        id,
      ]);

      return isUpdate.affectedRows;
    } catch (err) {
      throw err;
    } finally {
      conn.release();
    }
  }

  static async updateCustomerBasic(id, userInfo) {
    let conn;

    try {
      conn = await mariadb.getConnection();

      const query = `UPDATE customers SET name = ?, email = ? WHERE id = ?;`;

      const isUpdate = await conn.query(query, [
        userInfo.name,
        userInfo.email,
        id,
      ]);

      return isUpdate.affectedRows;
    } catch (err) {
      throw err;
    } finally {
      conn.release();
    }
  }

  static async updateCustomerCustom(id, userInfo) {
    let conn;

    try {
      conn = await mariadb.getConnection();

      const query = `UPDATE customer_custom_models SET 
      phone_number = ?,
      address = ?,
      birth_date = ?,
      gender = ?
      WHERE id = ?;`;

      const isUpdate = await conn.query(query, [
        userInfo.phoneNumber || null,
        userInfo.address || null,
        userInfo.birthDate || null,
        userInfo.gender || null,
        id,
      ]);

      return isUpdate.affectedRows;
    } catch (err) {
      throw err;
    } finally {
      conn.release();
    }
  }

  static async deleteOneById(id) {
    let conn;

    try {
      conn = await mariadb.getConnection();

      const query = `DELETE FROM customers WHERE id = ?;`;

      const user = await conn.query(query, [id]);

      return user.affectedRows;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }
}

module.exports = CustomerStorage;
