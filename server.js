// Require necessary NPM packages 
const express = require ('express');
const mongoose = require ('mongoose');

// Require Route files
const indexRouter = require('./app/routes/index');
const articlesRouter = require('./app/routes/articles');

//require DB configration file 
const db = require('./config/db');

// Estaplish Database Connection
mongoose.connect(db, {useNewUrlParser: true });
mongoose.connection.once('open',() => {
    console.log('connected to Mongo ');
})


// Instantiate express Application object 
const app = express();

// define PORT for the API to run on 
const port = process.env.PORT || 5000;

/**   Routes *** */

//mount imported Routers
app.use(indexRouter);
app.use(articlesRouter);


// start the server to listen fro requests on a given port 
app.listen(port, () => {
    console.log(`blogy is listening on port ${port}`);
});