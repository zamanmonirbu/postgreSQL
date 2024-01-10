CREATE DATABASE bookshop;

CREATE TABLE book (id VARCHAR(256) PRIMARY KEY, name VARCHAR(256), description VARCHAR(256));

INSERT INTO book(id,name,description) VALUES("$1,$2,$3"),[id,name,description]

SELECT * FROM book

SELECT * FROM book WHERE id=id;

UPDATE book SET("$1,$2"),[name,description];

DELETE FROM book WHERE id=id;

