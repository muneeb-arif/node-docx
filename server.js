const express = require('express');
const doc = require('./generateDocWithUserData')
const cors = require('cors')

// create new express app and save it as "app"
const app = express();

// server configuration
app.use(cors())
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
app.listen(process.env.PORT || 3000, () => {
  console.log("Express server listening on port", process.env.PORT);
});