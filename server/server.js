require('dotenv').config();
const chalk = require('chalk');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const passport = require('passport');
const initJwtMiddleware = require('./middleware/JWTAuth.passport');
const isAdmin = require('./middleware/isAdmin');

// DB
const db = require('./utils/dbConnect');
db();

const port = process.env.PORT || 8000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
initJwtMiddleware();

// ROUTES
const productsRotues = require('./routes/products.routes');
const authRotues = require('./routes/auth.routes');
const userRotues = require('./routes/user.routes');

app.get(
  '/secret',
  passport.authenticate('jwt', { session: false }),
  isAdmin.checkIfUserIsAdmin,
  (req, res) => {
    res.json({
      succes: true
    });
  }
);

app.use('/api/products', productsRotues);
app.use('/api/auth', authRotues);
app.use('/api/user', userRotues);

app.get('/', (req, res) => {
  res.send('ECOMMERCE API');
});

app.listen(port, () =>
  console.log(chalk.bgBlue.blue(`Server is running on port ${port}`))
);
