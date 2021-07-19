/* eslint-disable no-undef */
import supertest from 'supertest';
import { Order } from '../../src/models/Order';
import { server } from '../../src/server';

const request = supertest(server);
const token: string = process.env.TOKEN_TEST as string;

describe('Test Order endpoint responses', () => {
  beforeAll(() => {
    spyOn(Order.prototype, 'createOrder').and.returnValue(
      Promise.resolve({
        id: 2,
        product_id: 10,
        quantity: 4,
        user_id: 2,
        status: 'active'
      })
    );
    spyOn(Order.prototype, 'getOrders').and.returnValue(
      Promise.resolve([
        {
          id: 1,
          product_id: 13,
          quantity: 1,
          user_id: 2,
          status: 'complete'
        },
        {
          id: 2,
          product_id: 10,
          quantity: 4,
          user_id: 2,
          status: 'active'
        }
      ])
    );
    spyOn(Order.prototype, 'getCurrentOrderByUserId').and.returnValue(
      Promise.resolve({
        id: 2,
        product_id: 10,
        quantity: 4,
        user_id: 2,
        status: 'active'
      })
    );
  });

  it('create order api endpoint', async (done) => {
    const res = await request
      .post('/orders')
      .set('Authorization', 'Bearer ' + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 2,
      product_id: 10,
      quantity: 4,
      user_id: 2,
      status: 'active'
    });
    done();
  });
  it('gets all orders api endpoint', async (done) => {
    const res = await request
      .get('/orders/2')
      .set('Authorization', 'Bearer ' + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        id: 1,
        product_id: 13,
        quantity: 1,
        user_id: 2,
        status: 'complete'
      },
      {
        id: 2,
        product_id: 10,
        quantity: 4,
        user_id: 2,
        status: 'active'
      }
    ]);
    done();
  });
});