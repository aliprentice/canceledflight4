// pages/api/webhook.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Webhook received successfully' });
}
