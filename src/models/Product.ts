import { PoolClient, QueryResult } from 'pg';
import { pool, parseError } from '../database';
import { ProductType, ProductReturnType } from '../interfaces/Product';

export class Product {
  table: string = 'products';

  async getProducts(): Promise<ProductReturnType[]> {
    try {
      const con: PoolClient = await pool.connect();
      const sql: string = `SELECT * FROM ${this.table}`;
      const result: QueryResult = await con.query(sql);
      con.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get all products. Error: ${parseError(err)}`);
    }
  }

  // select product by id
  async getProductById(productId: number): Promise<ProductReturnType> {
    try {
      const con: PoolClient = await pool.connect();
      const sql: string = `SELECT * FROM ${this.table} WHERE id=$1`;
      const result: QueryResult = await con.query(sql, [productId]);
      con.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get product by id. Error: ${parseError(err)}`);
    }
  }

  // create product
  async createProduct(product: ProductType): Promise<ProductReturnType> {
    try {
      const { name, price } = product;
      const sql: string = `INSERT INTO ${this.table} (name, price) VALUES($1, $2) RETURNING *`;
      const con: PoolClient = await pool.connect();
      const result: QueryResult = await con.query(sql, [
        name,
        price
      ]);
      con.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create product. Error: ${parseError(err)}`);
    }
  }

  // delete product
  async deleteProduct(id: number): Promise<ProductReturnType> {
    try {
      const sql: string = `DELETE FROM ${this.table} WHERE id=$1 RETURNING *`;
      const con: PoolClient = await pool.connect();
      const result: QueryResult = await con.query(sql, [id]);
      con.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not delete product ${id}. Error: ${parseError(err)}`
      );
    }
  }
}