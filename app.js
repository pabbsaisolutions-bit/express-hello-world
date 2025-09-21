const express = require('express');
const fetch = require('node-fetch');
const app = express();

const PORT = process.env.PORT || 10000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/proxy', async (req, res) => {
  try {
    const response = await fetch("https://api.pinterest.com/v5/oauth/token", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(req.body).toString()
    });

    const data = await response.json();
res.status(response.status).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
