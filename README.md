# twitter-campaign

First Install the Back-end application 
The back end is a Express / Sequelize app, usign a PostgreSQL db.

With your database started
change the contents of `server/config/config.json/` to your database.

Then:
```
cd server
npm install 
npx sequelize db:migrate:all
npx sequelize db:seed:all

npm start
```

Your application will run at `localhost:3000`
