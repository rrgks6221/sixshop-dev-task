## 목적

> 데이터베이스 초기화 대비 참고용

<br>

```sql
  CREATE DATABASE `six_shop` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

  USE six_shop;

  -- 상점
  CREATE TABLE stores (
    id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,

    PRIMARY KEY (id)
  );

  -- 고객
  CREATE TABLE customers (
    id VARCHAR(255) NOT NULL,
    store_id VARCHAR(255) NOT NUll,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,

    PRIMARY KEY (id),
    CONSTRAINT customers_fk1 FOREIGN KEY (store_id) REFERENCES stores (id) ON UPDATE CASCADE ON DELETE CASCADE
  );

  CREATE TABLE customer_use_flags (
    id VARCHAR(255) NOT NULL,
    store_id VARCHAR(255) NOT NUll,
    login_id TINYINT,
    phone_number TINYINT,
    address TINYINT,
    birth_date DATE,
    gender TINYINT,
    recommender TINYINT,
    reserve TINYINT,
    purchase_count TINYINT,
    purchase_amount TINYINT,

    PRIMARY KEY (id),
    CONSTRAINT customer_use_flags_fk1 FOREIGN KEY (store_id) REFERENCES stores (id) ON UPDATE CASCADE ON DELETE CASCADE
  );

  CREATE TABLE customer_custom_models (
    id VARCHAR(255) NOT NULL,
    store_id VARCHAR(255) NOT NULL,
    customer_id VARCHAR(255) NOT NULL,
    login_id VARCHAR(255),
    phone_number INT,
    address VARCHAR(255),
    birth_date DATE,
    gender TINYINT,
    recommender VARCHAR(255),
    reserve INT,
    purchase_count INT,
    purchase_amount INT,

    PRIMARY KEY (id),
    CONSTRAINT customer_custom_models_fk1 FOREIGN KEY (store_id) REFERENCES stores (id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT customer_custom_models_fk2 FOREIGN KEY (customer_id) REFERENCES customers (id) ON UPDATE CASCADE ON DELETE CASCADE
  );

  -- 상품
  CREATE TABLE product_categories (
    id VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,

    PRIMARY KEY(id)
  );

  CREATE TABLE products (
    id VARCHAR(255) NOT NULL,
    store_id VARCHAR(255) NOT NUll,
    product_category_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    price INT NOT NULL DEFAULT 0 NOT NULL,
    password VARCHAR(255) NOT NULL,

    PRIMARY KEY (id),
    CONSTRAINT products_fk1 FOREIGN KEY (store_id) REFERENCES stores (id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT products_fk2 FOREIGN KEY (product_category_id) REFERENCES product_categories (id) ON UPDATE CASCADE ON DELETE CASCADE
  );

  CREATE TABLE product_models (
    id VARCHAR(255) NOT NULL,
    store_id VARCHAR(255) NOT NULL,
    product_id VARCHAR(255) NOT NULL,

    PRIMARY KEY (id),
    CONSTRAINT product_models_fk1 FOREIGN KEY (store_id) REFERENCES stores (id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT product_models_fk2 FOREIGN KEY (product_id) REFERENCES products (id) ON UPDATE CASCADE ON DELETE CASCADE
  );

  CREATE TABLE add_products (
    id VARCHAR(255) NOT NULL,
    product_model_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,

    PRIMARY KEY (id),
    CONSTRAINT add_products_fk1 FOREIGN KEY (product_model_id) REFERENCES product_models (id) ON UPDATE CASCADE ON DELETE CASCADE
  );

  -- 주문
  CREATE TABLE order_product_list (
    id VARCHAR(255) NOT NULL,
    product_id VARCHAR(255) NOT NULL,

    PRIMARY KEY(id),
    CONSTRAINT order_product_list_fk1 FOREIGN KEY (product_id) REFERENCES products (id) ON UPDATE CASCADE ON DELETE CASCADE
  );

  CREATE TABLE order_status_list (
    id INT NOT NULL AUTO_INCREMENT,
    status VARCHAR(255) NOT NULL,

    PRIMARY KEY(id)
  );

  INSERT INTO order_status_list
  (status)
  VALUES
  ("입금 대기"),
  ("결제 완료"),
  ("배송 준비"),
  ("배송 중"),
  ("배송 완료"),
  ("거래 완료"),
  ("취소 요청"),
  ("취소 완료"),
  ("반품 요청"),
  ("반품 완료");

  CREATE TABLE orders (
    id VARCHAR(255) NOT NULL,
    store_id VARCHAR(255) NOT NUll,
    customer_id VARCHAR(255) NOT NULL,
    order_product_list_id VARCHAR(255) NOT NULL,
    order_status_list_id INT NOT NULL DEFAULT 1,
    price INT NOT NULL DEFAULT 0,

    PRIMARY KEY (id),
    CONSTRAINT orders_fk1 FOREIGN KEY (store_id) REFERENCES stores (id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT orders_fk2 FOREIGN KEY (customer_id) REFERENCES customers (id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT orders_fk3 FOREIGN KEY (order_product_list_id) REFERENCES order_product_list (id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT orders_fk4 FOREIGN KEY (order_status_list_id) REFERENCES order_status_list (id) ON UPDATE CASCADE ON DELETE CASCADE
  );

  CREATE TABLE order_models (
    id VARCHAR(255) NOT NULL,
    store_id VARCHAR(255) NOT NULL,
    order_id VARCHAR(255) NOT NULL,

    PRIMARY KEY (id),
    CONSTRAINT order_models_fk1 FOREIGN KEY (store_id) REFERENCES stores (id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT order_models_fk2 FOREIGN KEY (order_id) REFERENCES orders (id) ON UPDATE CASCADE ON DELETE CASCADE
  );

  CREATE TABLE add_orders (
    id VARCHAR(255) NOT NULL,
    order_model_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,

    PRIMARY KEY (id),
    CONSTRAINT add_orders_fk1 FOREIGN KEY (order_model_id) REFERENCES order_models (id) ON UPDATE CASCADE ON DELETE CASCADE
  );
```
