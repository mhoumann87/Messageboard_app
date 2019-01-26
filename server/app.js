const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    "message": "Så virker det"
  });
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});