
/* eslint-disable no-undef */
import { Order } from '../../src/models/Order';

import { User } from '../../src/models/User';
import { Product } from '../../src/models/Product';
import { OrderReturnType } from '../../src/interfaces/Order';

const order: Order = new Order();

describe('Order Model', () => {
  it('should have an getCurrentOrderByUserId  method', () => {
    expect(order.getCurrentOrderByUserId).toBeDefined();
  });

  it('should have a getOrders method', () => {
    expect(order.getOrders).toBeDefined();
  });
  it('should have a createOrder method', () => {
    expect(order.createOrder).toBeDefined();
  });
  describe('Manipulate Order methods', () => {
    const user = new User();
    const product = new Product();

    beforeAll(async () => {
      await user.createUser({
        firstName: 'kevin',
        lastName: 'eyong',
        password: 'thisismeenow2020#'
      });
      await product.createProduct({
        name: 'iPhone',
        price: '645'
      });
    });
    afterAll(async () => {
      await user.deleteUser(1);
      await product.deleteProduct(1);
    });
  });
});