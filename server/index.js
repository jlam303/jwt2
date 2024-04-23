const { MongoClient } = require('mongodb');
const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const usersRoute = require('./routes/usersController');
const blogsRoute = require('./routes/blogsController');

const connectDB = require('./db/connect');

app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('servy work');
});

app.use('/users', usersRoute);
app.use('/blogs', blogsRoute);

const initServer = async () => {
  try {
    await connectDB(process.env.REACT_APP_MONGO);
    app.listen(5000, () => {
      console.log('5000');
    });
  } catch (err) {
    console.log(err);
  }
};

initServer();