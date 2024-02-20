const express = require('express');
const app = express();

// Enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// Endpoint to serve static files
app.use(express.static('public'));

// Homepage route
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Hello API endpoint
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Timestamp API endpoint
app.get('/api/:date?', (req, res) => {
  let inputDate = req.params.date;

  if (!inputDate) {
    inputDate = new Date();
  } else {
    // Check if the input date is a valid timestamp or date string
    if (!isNaN(inputDate)) {
      inputDate = new Date(parseInt(inputDate));
    } else {
      inputDate = new Date(inputDate);
    }
  }

  if (inputDate.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({ unix: inputDate.getTime(), utc: inputDate.toUTCString() });
  }
});

// Listen on the specified port or default to 3000
const PORT = process.env.PORT || 3000;
const listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
