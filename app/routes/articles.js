// require nessary NPM packages 
const express = require('express');

// require Mongoose model for Article 
const Article = require('../models/article');

// instantatee a Router (mini app that only handles routes)
const router = express.Router();

/**
 * Action:     INDEX
 * METHOD:      GET
 * URI:     /api/articles
 * description: get all Articles 
 */

router.get('/api/articles',(req,res) => {
    Article.find()
    // return all articles as an array
    .then((articles) => {
    res.status(200).json({ message: 'Get all Articles'});
})
// catch any errors that might 
.catch((error) => {
    res.status(500).json({error: error});
})
});

 /**
 * Action:     SHOW
 * METHOD:      GET
 * URI:     /api/articles/5d664b8b68b4f5092aba18e9
 * description: get an Articles by artticle id
 */



 /**
 * Action:     CREATE
 * METHOD:      POST
 * URI:     /api/articles
 * description: create a new Article
 */

 /**
 * Action:     UPDATE
 * METHOD:      PATCH (for multybal filed /put for one filed)
 * URI:     /api/articles/5d664b8b68b4f5092aba18e9
 * description: upadte  an Article by artcle id
 */

 /**
 * Action:     DESTROY
 * METHOD:      DELETE 
 * URI:     /api/articles/5d664b8b68b4f5092aba18e9
 * description: delete an Article by artcle id
 */


// export the Router so we can use it in the server.js file 
module.exports = router;
