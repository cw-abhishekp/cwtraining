const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.get('/api/stocks', async (req, res) => {
  try {
    const response = await fetch('https://stg.carwale.com/api/stocks');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log('Proxy running on port 5000'));
