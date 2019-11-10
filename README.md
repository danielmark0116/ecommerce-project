# LIVE PREVIEW

https://grychtol.com.pl

# IMPLEMENTED FEATURES

- product filtering by different params
- cart feature
- checkout with promo codes feature
- notifications (e-mail ones and popup ones)
- disabling the ability to add more of the product than there is in stock
- disabling the ability to add sth to cart when product is not in stock
- each new order updates products stock
- payments with stripe
- user auth with Google and JWT Tokens

# INSTALLATION & QUICK START

---

To run the app on your local machine, install all the dependencies:

```
yarn install
```

---

After installing the dependencies, create .env file inside SERVER dir.
Add variables to it:

###### To the KODILLA mentor - I messaged these variables to you, just copy them :)

```
MODE=development
PORT=8000
JWT_SECRET=your secret for signing JWT tokens
GOOGLE_CLIENT_ID= you google client id for google log in feature
STRIPE_PUBLIC_KEY=your public stripe key for payments
STRIPE_SECRET_KEY=as above, but private
MONGO_URI=mongodb connection string
mailerMail=email address (mail notifications feature)
mailerPass=password for email (mail notifications feature)
```

\* leave PORT 8000 - there's a proxy set in the client react app. Or change it but remember to change it also in the react package.json

\*\* If you don't have my MONGO_URI connection string, both dbs (local and Atlas) will be empty, you can populate it with script (see below)

---

Do the same in CLIENT dir

```
REACT_APP_MODE=development
REACT_APP_CLIENT_ID_GOOGLE=google client id (same as above)
```

\* in `development` mode, Redux DEVTOOLS are active. You can quickly disable it though by editing `devToolsMode = false | true` in /client/src/App/config.js

---

After installing all the dependencies and setting vars in .env files, run

```
yarn dev
```

This will start the server on port localhost:8000 and react app on localhost:3000

DB hosted on mongoDB Atlas will be used. To use local DB edit variable in /server/config.js (to populate DB: see below)

---

# FURTHER CONFIGURATION

You can run the app in `production` mode. This will use Atlas DB only + the server will serve the BUILD from react app.

Also, Redux Devtools will be disabled.

To do so, first edit vars in both .env files

```
// /server
...
MODE=production

```

&

```
// /client
...
REACT_APP_MODE=production

```

Then, build the app.

Run `yarn build` either from ROOT or from CLIENT dir

After successfull build, run either:

```
yarn server
```

or

```
yarn start
```

`yarn server` will run the server with nodemon, `yarn start` will run the server without it

---

# SWITCHING BETWEEN DBs IN DEVELOPMENT MODE

In PRODUCTION, the app will use production DB (Atlas - thus you need to add MONGO_URI to env file). When in development, app will use either production DB or local (use `exports.useProductionDb = true;` in /server/config.js to toggle between these two)\*.

\* remember to have `mongod` running when using local db + the local db will be empty by default. You can populate it: see below

# POPULATING LOCAL DB

You can populate the local DB with some dummy data by running `yarn populatedb` either from root or from server dir.

Remember to update the connection string of local DB in /server/utils/dbConnect.js and /server/utils/dbPopulate.js
