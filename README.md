# LIVE PREVIEW

https://grychtol.com.pl

# INSTALLATION

---

To run the app on your local machine, install all the dependencies:

```
yarn install
```

---

After installing the dependencies, create .env file inside SERVER dir.
Add variables to it:

```
MODE=development | production
PORT=8000
JWT_SECRET=your secret for signing JWT tokens
GOOGLE_CLIENT_ID= you google client id for google log in feature
STRIPE_PUBLIC_KEY=your public stripe key for payments
STRIPE_SECRET_KEY=as above, but private
MONGO_URI=mongodb connection string
mailerMail=email address (mail notifications feature)
mailerPass=password for email (mail notifications feature)
```

In PRODUCTION, the app will use production DB (Atlas). When in development, app will use either production DB or local (use `exports.useProductionDb = true;` in /server/config.js to toggle between these two)\*.

\* remember to have `mongod` running when using local db + the local db will be empty by default. You can populate it with some dummy data by running `yarn populatedb` either from root or from server dir

\*\* leave PORT 8000 - there's a proxy set in the client react app. Or change it but remember to change it also in the react package.json

---

Do the same in CLIENT dir

```
REACT_APP_MODE=development | production
REACT_APP_CLIENT_ID_GOOGLE=google client id (same as above)
```

\* When in PRODUCTION mode, redux devtools will be deactiveted. When in DEVELOPMENT, they will be active. You can quickly disable it though by editing `devToolsMode = false | true` in /client/src/config.js

---

To run the SERVER app and REACT app simultaneously, in DEVELOPMENT mode, set environmental MODE vars to DEVELOPMENT and type
`yarn dev` from root DIR

To run the SERVER app with client BUILD, build client app, first
`yarn build` from ROOT or from CLIENT DIR
\+ have env MODE vars set to PRODUCTION
and then
`yarn start` from root DIR or `yarn server` if you have nodemon installed

---
