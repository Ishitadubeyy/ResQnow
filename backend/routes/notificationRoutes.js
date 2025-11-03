import express from 'express';
import webpush from 'web-push';
const router = express.Router();

// In-memory store for demo; use DB in production
const subscriptions = [];

router.post('/subscribe', (req, res) => {
  const sub = req.body;
  subscriptions.push(sub);
  res.status(201).json({ message: 'Subscribed' });
});

// Endpoint to trigger a test notification
router.post('/test', async (req, res) => {
  const payload = JSON.stringify({ title: 'Test', body: 'Push notification works!' });
  for (const sub of subscriptions) {
    try {
      await webpush.sendNotification(sub, payload);
    } catch (e) { /* ignore */ }
  }
  res.json({ message: 'Notifications sent' });
});

export default router;
