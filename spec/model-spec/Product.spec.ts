/* eslint-disable no-undef */
import { Product } from '../../src/models/Product';
import { ProductReturnType } from '../../src/interfaces/Product';

const product: Product = new Product();

describe('Product Model', () => {
  it('should have a createProduct  method', () => {
    expect(product.createProduct).toBeDefined();
  });

  it('should have a getProductById method', () => {
    expect(product.getProductById).toBeDefined();
  });
  it('should have a getProducts method', () => {
    expect(product.getProducts).toBeDefined();
  });
  it('should have a deleteProduct method', () => {
    expect(product.deleteProduct).toBeDefined();
  });
});