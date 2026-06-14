require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');
const { initDB } = require('./db');
const authRoutes  = require('./routes/auth');
const usersRoutes = require('./routes/users');

const app  = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.use('/api/auth',  authRoutes);
app.use('/api/users', usersRoutes);

if (process.env.NODE_ENV === 'production') {
  const dist = path.join(__dirname, '../client/dist');
  app.use(express.static(dist));
  app.get('*', (req, res) => res.sendFile(path.join(dist, 'index.html')));
}

initDB()
  .then(() => app.listen(PORT, () => console.log(`Server listening on port ${PORT}`)))
  .catch(err => { console.error('DB init failed:', err); process.exit(1); });
