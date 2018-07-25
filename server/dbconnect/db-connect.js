import promise from 'bluebird';
import config from '../config/config';

const environment = process.env.NODE_ENV || 'development';

const options = {
  promiseLib: promise
};
const cn = config[environment];
const pgp = require('pg-promise')(options);

const db = pgp(cn);

export default db;
