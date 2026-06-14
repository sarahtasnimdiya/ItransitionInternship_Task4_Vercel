const jwt = require('jsonwebtoken');
const { pool } = require('../db');

async function protect(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authenticated. Please log in.' });
    }

    const token = header.split(' ')[1];
    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.status(401).json({ message: 'Session expired. Please log in again.' });
    }

    const { rows } = await pool.query(
      'SELECT id, name, email, status FROM users WHERE id = $1',
      [decoded.id]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Account no longer exists. Please register again.' });
    }

    if (rows[0].status === 'blocked') {
      return res.status(403).json({ message: 'Your account has been blocked.' });
    }

    req.user = rows[0];
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(500).json({ message: 'Server error during authentication.' });
  }
}

module.exports = { protect };
