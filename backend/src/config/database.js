const { Pool } = require('pg');
require('dotenv').config();

const host = process.env.DB_HOST || 'localhost';
const isLocalHost = host === 'localhost' || host === '127.0.0.1';
const requiresSsl =
  process.env.DB_SSL === 'true' ||
  process.env.NODE_ENV === 'production' ||
  (!isLocalHost && (host.includes('.render.com') || host.startsWith('dpg-')));

const pool = new Pool({
  host,
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'books_db',
  ssl: requiresSsl ? { rejectUnauthorized: false } : false,
});

const initDatabase = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS books (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      published_year INTEGER,
      isbn VARCHAR(50),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(createTableQuery);
};

module.exports = {
  pool,
  query: (text, params) => pool.query(text, params),
  initDatabase,
};
