require('dotenv').config();

const config = {
  development: process.env.DATABASE_URL,
  test: process.env.DATABASE_TEST_URL,
  production: process.env.DATABASE_URL_PRO
};

export default config;
