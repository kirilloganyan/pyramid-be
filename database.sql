
CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    login VARCHAR(100) UNIQUE,
    money NUMERIC(12, 2) DEFAULT 0,
    tg_id VARCHAR(50) UNIQUE
);
