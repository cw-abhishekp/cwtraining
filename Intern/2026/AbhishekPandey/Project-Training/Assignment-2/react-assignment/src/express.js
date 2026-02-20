// const express = require('express');
// const cors = require('cors');

// const app = express();

// app.use(cors({
//   origin: 'http://localhost:3000'
// }));

// app.get('/api/v1/stocks', async (req, res) => {
//   try {
//     const params = new URLSearchParams(req.query).toString();
//     // const url = `https://carwale.com/api/stocks?${params}`;
//     const url = `http://localhost:5005/api/v1/stocks?${params}`;

//     const response = await fetch(url);
//     const data = await response.json();
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.listen(5000, () => console.log('Proxy running on port 5000'));

// app.get('/api/v1/make', async (req, res) => {
//   try {
//     // const response = await fetch('https://carwale.com/api/v2/makes/?type=new');
//        const response = await fetch('http://localhost:5005/api/v1/make');
//     const data = await response.json();
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.get('/api/v1/cities', async (req, res) => {
//   try {
//     // const response = await fetch('https://carwale.com/api/cities');
//       const response = await fetch('http://localhost:5005/api/v1/cities');
//     const data = await response.json();
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });



const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
});

const BACKEND_URL = 'http://localhost:5005';

// --- STOCKS ROUTE ---
app.get('/api/v1/stocks', async (req, res) => {
    try {
        const params = new URLSearchParams(req.query).toString();
        const response = await fetch(`${BACKEND_URL}/api/v1/stocks?${params}`);
        const data = await response.json();
        
        // Forward the actual status code from .NET
        res.status(response.status).json(data);
    } catch (err) {
        res.status(502).json({ error: true, message: "Backend unreachable", details: err.message });
    }
});

// --- MAKES ROUTE ---
app.get('/api/v1/make', async (req, res) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/v1/make`);
        const data = await response.json();
        
        res.status(response.status).json(data);
    } catch (err) {
        res.status(502).json({ error: true, message: "Backend unreachable", details: err.message });
    }
});

// --- CITIES ROUTE ---
app.get('/api/v1/cities', async (req, res) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/v1/cities`);
        const data = await response.json();
        
        res.status(response.status).json(data);
    } catch (err) {
        res.status(502).json({ error: true, message: "Backend unreachable", details: err.message });
    }
});

app.listen(5000, () => console.log('Proxy running on port 5000 -> Forwarding to 5005'));





