const { Router } = require('express');
const health = Router();

health.get('/health', (_req, res) => res.json({ success: true, message: 'ok', data: { uptime: process.uptime() } }));

module.exports = health;
