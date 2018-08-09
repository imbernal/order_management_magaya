require('dotenv').config();

const express = require('express'),
      app = express();
mongoose = require('mongoose');
port = process.env.PORT || 3000,
      bodyParser = require('body-parser'),
      cors = require('cors');

mongoose.Promises = global.Promise;

mongoose.connect(`mongodb://imbernal:israel1q2w3@ds259711.mlab.com:59711/orders`)
      .then(() => console.log("Connected"))
      .catch(err => console.log("Error: ", err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

require('./src/routes')(app);

app.listen(port, () => console.log(`Listen on ${port}`));