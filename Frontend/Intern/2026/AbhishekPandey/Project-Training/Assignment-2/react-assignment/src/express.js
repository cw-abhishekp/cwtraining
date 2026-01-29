const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.get('/api/stocks', async (req, res) => {
  try {
    const params = new URLSearchParams(req.query).toString();
    const url = `https://stg.carwale.com/api/stocks?${params}`;

    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log('Proxy running on port 5000'));

app.get('/api/v2/makes', async (req, res) => {
  try {
    const response = await fetch('https://stg.carwale.com/api/v2/makes/?type=new');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/cities', async (req, res) => {
  try {
    const response = await fetch('https://stg.carwale.com/api/cities');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
