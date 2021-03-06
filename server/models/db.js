import { Client } from 'pg';
import dotenv from 'dotenv';
import config from '../config/config';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const connectionString = config[env];
const client = new Client(connectionString);
client.connect();

const usersQuery = 'DROP TABLE IF EXISTS users CASCADE; CREATE TABLE users (id SERIAL NOT NULL PRIMARY KEY, email VARCHAR NOT NULL UNIQUE, password VARCHAR NOT NULL, firstname VARCHAR, lastname VARCHAR, sex BOOLEAN, bio TEXT, notification BOOLEAN, createdat TIMESTAMP NOT NULL DEFAULT NOW(), updatedat TIMESTAMP NOT NULL DEFAULT NOW() );';
const entryQuery = 'DROP TABLE IF EXISTS entries; CREATE TABLE entries (id SERIAL PRIMARY KEY, title VARCHAR NOT NULL, category VARCHAR NOT NULL, image VARCHAR NOT NULL, story TEXT NOT NULL, userId INT NOT NULL, createdat TIMESTAMP NOT NULL DEFAULT NOW(), updatedat TIMESTAMP NOT NULL DEFAULT NOW(), FOREIGN KEY (userId) REFERENCES "users" (id) ON UPDATE CASCADE ON DELETE CASCADE);';

const dbQuery = `${usersQuery} ${entryQuery}`;

client.query(dbQuery, (err) => {
  client.end();
  if (err) { console.log(err); }
});
