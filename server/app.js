const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const messages = require('./db/messages');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    "message": "Working"
  });
});

app.get('/messages', (req, res) => {
  messages.getAll()
    .then(messages => {
      res.json(messages);
    })
});

app.post('/messages', (req, res) => {
  console.log(req.body);
  messages.insertMsg(req.body)
    .then(message => {
      res.json(message);
    })
    .catch(err => {
      res.status(500);
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});