// Require necessary NPM packages 
const express = require ('express');
const mongoose = require ('mongoose');

// Instantiate express Application object 
const app = express();

// define PORT for the API to run on 
const port = process.env.PORT || 5000;

// start the server to listen fro requests on a given port 
app.listen(port, () => {
    console.log(`blogy is listening on port ${port}`);
});