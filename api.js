// api.js

const express = require('express');
const app = express();

// Define your unavailable dates and time slots
const unavailableSlots = [
  {
    date: '2023-06-20',
    slots: ['09:00', '10:00', '14:00']
  },
  {
    date: '2023-06-22',
    slots: ['11:00', '15:00']
  },
  // Add more unavailable dates and time slots as needed
];

// Endpoint to get the unavailable dates and time slots
app.get('/api/appointments', (req, res) => {
  res.json(unavailableSlots);
});

// Start the server
app.listen(3000, () => {
  console.log('API server is running on http://localhost:3000');
});
