
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date() });
});

app.get('/api/info', (req, res) => {
  res.json({
    app: 'AWS ECS Demo App',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app; 