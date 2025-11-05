const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

// Serve static files from the 'fibank' directory
app.use('/assets',express.static(path.join(__dirname, '..', 'assets')));
app.use(express.static(path.join(__dirname, '..')));

app.use(express.json());

// Import routes
const routes = require('./routes/route');
app.use('/api', routes);

// Route for the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
  
});


// app start
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`📂 Serving files from: ${path.join(__dirname, '..','assets')}`);
});