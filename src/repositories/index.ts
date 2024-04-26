import { Client } from "pg"

export * from "./users-repositroy"
export * from "./roles-repository"


export async function initAsync(dbClient: Client) : Promise<void>{
    await dbClient.query(`CREATE TABLE IF NOT EXISTS roles(
        id SERIAL PRIMARY KEY,
        code TEXT,
        label TEXT
    );`)
    
    await dbClient.query(`INSERT INTO roles(code,label) VALUES('admin', 'Администратор'),('manager', 'Руководитель'),('employee', 'Сотрудник');`)
    
    await dbClient.query(`CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        login TEXT,
        pass TEXT,
        fio TEXT,
        id_role INT REFERENCES roles (id),
        is_blocked INT default 0
    );`)
    
    await dbClient.query(`INSERT INTO users(login, pass,fio,id_role,is_blocked) VALUES
    ('admin', '098f6bcd4621d373cade4e832627b4f6', 'Тестовый Администратор', 1, 0),
    ('manager', '098f6bcd4621d373cade4e832627b4f6', 'Тестовый Руководитель', 2, 0),
    ('employee', '098f6bcd4621d373cade4e832627b4f6', 'Тестовый Сотрудник', 3, 0);`)
    
    await dbClient.query(`CREATE TABLE IF NOT EXISTS clients(
        id SERIAL PRIMARY KEY,
        label TEXT
    );`)
    
    await dbClient.query(`INSERT INTO clients(label) VALUES('Тестовый клиент');`)
    
    await dbClient.query(`CREATE TABLE IF NOT EXISTS order_statuses(
        id SERIAL PRIMARY KEY,
        label TEXT
    );`)
    
    await dbClient.query( `INSERT INTO order_statuses(id,label) VALUES
    (10, 'Проект'),
    (20, 'В работе'),
    (30, 'Завершён');`)
    
    await dbClient.query(`CREATE TABLE IF NOT EXISTS orders(
        id SERIAL PRIMARY KEY,
        label TEXT,
        id_status INT NOT NULL DEFAULT 10,
        id_client INT REFERENCES clients(id),
        amount NUMERIC(20,2)
    );`)
    
    await dbClient.query(`CREATE TABLE IF NOT EXISTS order_items(
        id SERIAL PRIMARY KEY,
        label TEXT,
        id_order INT REFERENCES orders(id),
        amount NUMERIC(20,2)
    );`)
    
    await dbClient.query(`CREATE TABLE IF NOT EXISTS payment_types(
        id SERIAL PRIMARY KEY,
        label TEXT
    );`)
    
    await dbClient.query(`INSERT INTO payment_types(id, label) VALUES
    (10, 'Аванс'),
    (20, 'Основной');`)
    
    await dbClient.query(`CREATE TABLE IF NOT EXISTS payments(
        id SERIAL PRIMARY KEY,
        id_order INT,
        id_payment_type INT REFERENCES payment_types(id),
        amount NUMERIC(20,2)
    );`)
}


export async function dropAsync(dbClient:Client) {

    dbClient.query(`drop table if exists payments;`)

    dbClient.query(`drop table if exists payment_types;`)

    dbClient.query(`drop table if exists order_items;`)

    dbClient.query(`drop table if exists orders;`)

    dbClient.query(`drop table if exists order_statuses;`)

    dbClient.query(`drop table if exists clients;`)

    dbClient.query(`drop table if exists users;`)

    dbClient.query(`drop table if exists roles;`)

}