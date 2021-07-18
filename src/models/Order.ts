import { pool, parseError } from '../database';
import { OrderReturnType, OrderType } from '../interfaces/Order';

export class Order {
  table: string = 'orders';
  async getOrders(userId: number): Promise<OrderReturnType[]> {
    try {
      const con = await pool.connect();
      const sql = `SELECT * FROM ${this.table} WHERE user_id=$1`;
      const result = await con.query(sql, [userId]);
      con.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get all orders of user. Error: ${parseError(err)}`
      );
    }
  }

  async getCurrentOrderByUserId(userId: number): Promise<OrderReturnType> {
    try {
      const con = await pool.connect();
      const sql = `SELECT * FROM ${this.table} WHERE user_id = ${userId} ORDER BY id DESC LIMIT 1`;
      const result = await con.query(sql);
      con.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get current order. Error: ${parseError(err)}`);
    }
  }
  async createOrder(order: OrderType): Promise<OrderReturnType> {
    try {
      const { product_id, quantity, user_id, status } = order;
      const con = await pool.connect();
      const sql = `INSERT INTO ${this.table} (product_id, quantity, user_id, status) VALUES($1, $2, $3, $4) RETURNING *`;
      const result = await con.query(sql, [
        product_id,
        quantity,
        user_id,
        status
      ]);
      con.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create order. Error: ${parseError(err)}`);
    }
  }
}