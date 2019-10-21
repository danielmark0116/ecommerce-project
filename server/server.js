require('dotenv').config();
const chalk = require('chalk');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const app = express();

// DB
const db = require('./utils/dbConnect');
db();

const port = process.env.PORT || 8000;

app.use(helmet());
app.use(cors());
app.use(express.json());

// ROUTES
const productsRotues = require('./routes/products.routes');
app.use('/api/products', productsRotues);

app.get('/', (req, res) => {
  res.send('ECOMMERCE API');
});

app.listen(port, () =>
  console.log(chalk.bgBlue.blue(`Server is running on port ${port}`))
);
