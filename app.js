const express = require('express');
const fetch = require('node-fetch');
const app = express();

const PORT = process.env.PORT || 10000;

app.use(express.json());

app.all('/proxy', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: 'Missing ?url=' });
  }

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        ...req.headers,
        host: new URL(url).host
      },
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : JSON.stringify(req.body)
    });

    const data = await response.text();
    res.status(response.status).send(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
