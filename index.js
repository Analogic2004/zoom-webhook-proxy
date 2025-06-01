const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
app.use(bodyParser.json());

const N8N_WEBHOOK_URL = 'https://n8n.yourdomain.com/webhook/zoom-recording-complete';

app.post('/', async (req, res) => {
  const { plainToken } = req.body;

  if (plainToken) {
    return res.send(plainToken); // For Zoom validation
  }

  try {
    await axios.post(N8N_WEBHOOK_URL, req.body);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to forward to n8n');
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Zoom proxy server is running.');
});
