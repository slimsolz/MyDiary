require('dotenv').config();

const config = {
  development: process.env.DATABASE_URL,
  test: process.env.DATABASE_TEST_URL
};

export default config;
