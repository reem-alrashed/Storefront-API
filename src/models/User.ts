import bcrypt from 'bcrypt';
import { pool, parseError } from '../database';
import { generateToken } from '../utils';
import {
  UserReturnType,
  UserType,
  UserCreatedReturnType
} from '../interfaces/User';
import { PoolClient, QueryResult } from 'pg';

export class User {
  table: string = 'users';

  async getUsers(): Promise<UserReturnType[]> {
    try {
      const con: PoolClient = await pool.connect();
      const sql: string = `SELECT * FROM ${this.table}`;
      const result: QueryResult = await con.query(sql);
      con.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get all users. Error: ${parseError(err)}`);
    }
  }

  // select user by id
  async getUserById(userId: number): Promise<UserReturnType> {
    try {
      const con: PoolClient = await pool.connect();
      const sql: string = `SELECT * FROM ${this.table} WHERE id = $1`;
      const result: QueryResult = await con.query(sql, [userId]);
      con.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get user by id. Error: ${parseError(err)}`);
    }
  }

  // create a user
  async createUser(user: UserType): Promise<UserCreatedReturnType> {
    try {
      const { firstname, lastname, password } = user;
      const pepper: string = process.env.BCRYPT_PASSWORD as string;
      const salt: string = process.env.SALT_ROUNDS as string;

      const hashPassword: string = bcrypt.hashSync(
        password + pepper,
        parseInt(salt)
      );
      const con: PoolClient = await pool.connect();
      const sql: string = `INSERT INTO ${this.table} (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *`;
      const result: QueryResult = await con.query(sql, [
        firstname,
        lastname,
        hashPassword
      ]);
      con.release();

      const id: number = result.rows[0].id;
      const token: string = generateToken(id);
      return {
        auth: true,
        token
      };
    } catch (err) {
      throw new Error(`Could not create user. Error: ${parseError(err)}`);
    }
  }

  // delete user
  async deleteUser(id: number): Promise<UserReturnType> {
    try {
      const sql: string = `DELETE FROM ${this.table} WHERE id=$1 RETURNING *`;
      const con: PoolClient = await pool.connect();
      const result: QueryResult = await con.query(sql, [id]);
      con.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${parseError(err)}`);
    }
  }
}