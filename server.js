// File: server.js
// Description: This is a standard Node.js server using the Express framework, optimized for Render.

// Step 1: Import necessary packages
const express = require('express');
const cors = require('cors');

// Step 2: Create the Express application
const app = express();

// Step 3: Set up the port. This is VERY important for Render.
// It will use the port provided by Render's server, or port 3000 on your local computer.
const PORT = process.env.PORT || 3000;

// Step 4: Use CORS. This allows your frontend website (on free.nf) to communicate with this backend.
app.use(cors());

// Step 5: Define your main API endpoint. This is the URL your frontend will call.
// Example: https://your-backend-url.onrender.com/analyze?url=google.com
app.get('/analyze', (req, res) => {
    // Get the website URL that the frontend sends in the query
    const websiteUrl = req.query.url;

    // If the URL is missing, send a clear error message
    if (!websiteUrl) {
        return res.status(400).json({ error: 'Website URL is required.' });
    }

    // This log will appear in your Render dashboard, which is great for checking if requests are coming.
    console.log(`Received request to analyze: ${websiteUrl}`);

    // Create some fake (dummy) data to send back.
    // In the future, you will replace this part with a real API call.
    const analysisData = {
        url: websiteUrl,
        estimatedMonthlyVisitors: `${(Math.random() * 8 + 1).toFixed(1)}M`,
        estimatedMonthlyRevenue: `$${Math.floor(Math.random() * 20) + 10}K`,
        message: "Data fetched successfully from Render!"
    };

    // Send the data back to the frontend as a JSON response
    res.json(analysisData);
});

// Step 6: Start the server and listen for requests on the specified port
app.listen(PORT, () => {
    console.log(`Server is running successfully and listening on port ${PORT}`);
});
