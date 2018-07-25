import dotenv from 'dotenv';
import { Client } from 'pg';
import config from '../config/config';


dotenv.config();
const environment = process.env.NODE_ENV || 'development';
const connectionString = config[environment];
const client = new Client(connectionString);
client.connect();

const usersquery = 'DROP TABLE IF EXISTS users CASCADE; CREATE TABLE users (id SERIAL NOT NULL PRIMARY KEY, email VARCHAR NOT NULL UNIQUE, password VARCHAR NOT NULL, firstname VARCHAR, lastname VARCHAR, sex VARCHAR, bio TEXT, notification VARCHAR);';
const entryquery = 'DROP TABLE IF EXISTS entries; CREATE TABLE entries (id SERIAL PRIMARY KEY, title VARCHAR NOT NULL, category VARCHAR NOT NULL, image VARCHAR NOT NULL, story TEXT NOT NULL, userId INT NOT NULL, FOREIGN KEY (userId) REFERENCES "users" (id) ON DELETE CASCADE);';

const query = `${usersquery} ${entryquery}`;

client.query(query, (err) => {
  client.end();
  if (err) { console.log(err.message); }
});
