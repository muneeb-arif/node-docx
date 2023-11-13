const express = require('express');
const doc = require('./generateDocWithUserData')

// create new express app and save it as "app"
const app = express();

// server configuration
const PORT = process.env.PORT || 5000;

app.use(express.json())

// create a route for the app
app.post('/', async (req, res) => {
    const requestBody = req.body;
    const response = await doc.handleDoc(requestBody, requestBody.inputFile, requestBody.outputFile)
    return res.json(response)
});

app.get('/test', (req, res) => {
  return res.json({'status': 200});
})

// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});