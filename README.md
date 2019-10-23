# INSTALLATION

---

To run the app on your local machine, install all the dependencies:

```
yarn install
```

then

```
cd server
yarn install
```

then

```
cd ..
cd client
yarn install
```

---

After installing the dependencies, create .env file inside SERVER dir.
Add two variables to it:

```
MODE=development | production
PORT=8000 | or what ever you wish
```

---

Do the same in CLIENT dir

```
REACT_APP_MODE=development | production
```

---

If you wish to disable the redux Devtools in any moment, change the boolean inside
CLIENT/src/App/config.ts

```
devToolsMode = true | false
```

---

To run the project in dev mode, type
`yarn dev` from root DIR

---

Initially, the local DB is empty, you can populate it with script.
Type `yarn populatedb` from SERVER dit
