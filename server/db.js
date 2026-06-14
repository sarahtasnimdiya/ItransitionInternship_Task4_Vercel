const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id            SERIAL PRIMARY KEY,
      name          VARCHAR(255)  NOT NULL,
      email         VARCHAR(255)  NOT NULL,
      password_hash VARCHAR(255)  NOT NULL,
      status        VARCHAR(20)   NOT NULL DEFAULT 'unverified',
      last_login    TIMESTAMPTZ,
      created_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
      verify_token  VARCHAR(255)
    );

    CREATE UNIQUE INDEX IF NOT EXISTS users_email_unique_idx ON users(email);
  `);

  console.log('DB ready — table and unique index verified.');
}

module.exports = { pool, initDB };
