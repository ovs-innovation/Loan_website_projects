const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8091;
const cors = require('cors');

// Middleware
app.use(cors());  
app.use(express.json());

// Import routes
const routes = require('./routes/route');
app.use('/api', routes);

// app start
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`📂 Serving files from: ${path.join(__dirname, '..','assets')}`);

});


