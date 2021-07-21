CREATE TABLE order_products (
  order_id INT,
  product_id INT,
  CONSTRAINT fk_order_id FOREIGN KEY(order_id) REFERENCES orders(id),
  CONSTRAINT fk_product_id FOREIGN KEY(product_id) REFERENCES products(id),
  quantity INT
);