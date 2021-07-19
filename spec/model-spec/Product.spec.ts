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
  it('should create a product using createProduct method', async () => {
    const result: ProductReturnType = await product.createProduct({
      name: 'iPhone',
      price: '645'
    });
    expect(result).toEqual({
      id: 2,
      name: 'iPhone',
      price: '645'
    });
  });
  it('should return a list of products using getProducts', async () => {
    const result: ProductReturnType[] = await product.getProducts();
    expect(result).toEqual([
      {
        id: 2,
        name: 'iPhone',
        price: '645'
      }
    ]);
  });

  it('should return the correct product using getProductById', async () => {
    const result: ProductReturnType = await product.getProductById(2);
    expect(result).toEqual({
      id: 2,
      name: 'iPhone',
      price: '645'
    });
  });

  it('should delete the correct product using deleteProduct', async () => {
    const result: ProductReturnType = await product.deleteProduct(2);
    expect(result).toEqual({
      id: 2,
      name: 'iPhone',
      price: '645'
    });
  });
});