const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require('cors');

const app = express();
const PORT = process.env.REACT_APP_API_PORT;
const API_URL = process.env.REACT_APP_API_URL;

// 특정 origin만 허용하는 CORS 설정
const corsOptions = {
    origin: API_URL,
    credentials: true
};

app.use(cors(corsOptions));

app.use(
    '/api/*',
    createProxyMiddleware({
        target: API_URL,
        changeOrigin: true,
    })
);

app.use(express.static(path.join(__dirname)));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
