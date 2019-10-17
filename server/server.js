require('dotenv').config();
const chalk = require('chalk');
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(port, () =>
  console.log(chalk.blue(`Server is running on port ${port}`))
);
