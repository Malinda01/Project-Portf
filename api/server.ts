import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 8080;

// Serve the static files from the 'client' folder we just created
app.use(express.static(path.join(__dirname, 'client')));

// Basic API routes (you can point these to your existing functions)
app.post('/api/SubmitFeedback', (req, res) => {
    // Your submission logic here
});

// For any other request, send back the React index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});