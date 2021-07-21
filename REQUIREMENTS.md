# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products

- Index: 'products/' 
Method: [GET]  [token required]

- Show: 'products/:id'   
Method: [GET]  [token required]

- Create: 'product/' 
Method: [POST]  [token required]


#### Users

- Index: 'users/' 
Method: [GET]  [token required]  

- Show: 'users/:id'   
Method: [GET]  [token required]

- Create: 'user/' 
Method: [POST]  [token required]
#### Orders
- Index: 'orders/:user_id' 
Method: [GET]  [token required]


- Current Order by user (args: user id)
Method: [GET]  [token required]

## Data Shapes
#### Product
-  id
- name
- price  

```
create table Product (
    id serial primary key,
    name varchar(50) not null,
    price number not null
    );

```

#### User
- id
- firstName
- lastName
- password

```
create table User (
    id serial primary key,
    firstName varchar(50) not null,
    lastName varchar(50) not null,
    password varchar(60) not null
    );

```
#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

```
create table Orders (
    id serial primary key,
    quantity integer,
    status enum(active, complete) not null,
    user_id integer (fk to users table),
    product_id integer (fk to products table)
    );
```

## Order_products

```
CREATE TABLE order_products(
  order_id INT,
  product_id INT,
  CONSTRAINT fk_order_id FOREIGN KEY(order_id) REFERENCES orders(id),
  CONSTRAINT fk_product_id FOREIGN KEY(product_id) REFERENCES products(id),
  quantity INT
);
```