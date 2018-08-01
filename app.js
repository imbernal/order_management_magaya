require('dotenv').config();

const express = require('express'),
      app = express();
      mongoose = require('mongoose');
      port = process.env.PORT || 3000,
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      cors = require('cors'),
      path = require('path');


mongoose.Promises = global.Promise;

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@ds259711.mlab.com:59711/${process.env.DB_NAME}`)
        .then( () => console.log("Connected") )
        .catch( err => console.log( "Error: " , err ) );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('combined'));
app.use(cors());

require('./src/routes')(app);

app.listen(port , ()=> console.log(`Listen on ${port}`));