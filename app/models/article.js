// Require necessery NPM packages
const mongoose = require('mongoose');

// Define Article Schema 
const articleSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: String,
    author: {type: String, required: true},
    published: {type: Boolean, default: true},
    publishedOn: {type: Date, default: Date.now},
},{ 
    timestamps: true
});

// compile our Model on the schema
const Article = mongoose.model('Article', articleSchema);

//export our model for use 
module.exports = Article;