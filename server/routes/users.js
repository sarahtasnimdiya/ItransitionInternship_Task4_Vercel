const express = require('express');
const { pool } = require('../db');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, name, email, status, last_login, created_at
       FROM users
       ORDER BY last_login DESC NULLS LAST, created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch users.' });
  }
});

router.post('/block', async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'Select at least one user.' });
    }

    await pool.query(
      "UPDATE users SET status = 'blocked' WHERE id = ANY($1::int[])",
      [ids]
    );

    res.json({ message: `${ids.length} user(s) blocked.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to block users.' });
  }
});

router.post('/unblock', async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'Select at least one user.' });
    }

    await pool.query(
      "UPDATE users SET status = 'active' WHERE id = ANY($1::int[])",
      [ids]
    );

    res.json({ message: `${ids.length} user(s) unblocked.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to unblock users.' });
  }
});

router.delete('/unverified', async (req, res) => {
  try {
    const { rowCount } = await pool.query(
      "DELETE FROM users WHERE status = 'unverified'"
    );
    res.json({ message: `${rowCount} unverified user(s) deleted.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete unverified users.' });
  }
});

router.delete('/', async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'Select at least one user.' });
    }

    await pool.query(
      'DELETE FROM users WHERE id = ANY($1::int[])',
      [ids]
    );

    res.json({ message: `${ids.length} user(s) deleted.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete users.' });
  }
});

module.exports = router;
