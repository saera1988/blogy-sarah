  
// require neccessary NPM packages
const express = require('express');
const mongoose = require('mongoose');


// instantatee a Router (mini app that only handles routes)
const router = express.Router();

// require Mongoose model for Article
const Article = require('../models/article').Article;
const Comment = require('../models/article').Comment;


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
    res.status(200).json({ articles: articles});
})
// catch any errors that might 
.catch((error) => {
    res.status(500).json({error: error});
})
});

 /**
 * Action:  show
 * Method:  GET 
 * URI:     /api/articles/5d664b8b68b4f5092aba18e9
 * Description: Get An Article by Article ID
 */
router.get('/api/articles/:id', (req, res) => {
    Article.findById(req.params.id)
        // return Article if exist
        if (Article) {
            res.status(200).json({ article: article });
        } else {
            // if there is no Article with a matching id
            res.status(404).json({
                error: {
                    name: 'DocumentNotFoundError',
                    message: 'The provided id doesn\'t match any document'
                }
            })
        }
});



 /**
 * Action:     CREATE
 * METHOD:      POST
 * URI:     /api/articles
 * description: create a new Article
 */

router.post('/api/articles',(req,res) => {
    console.log('this is log',req.body.article );
    
Article.create(req.body.article)
// on a successful 'create' ,respond with 201 
// HTTP status  and the content of the new article 
.then ((newArticle) => {
    res.status(201).json({ article: newArticle});

})
// catch any errors that might occure
.catch((error) => {
    res.status(500).json({ error: error});
});
});

/**
 * Action:  UPDATE
 * Method:  PATCH  // patch for multiply feildes and  put single feild
 * URI:     /api/articles/5d664b8b68b4f5092aba18e9
 * Description: Update an Article by Article ID 
 */
router.patch('/api/articles/:id', (req, res) => {
    Article.findById(req.params.id)
    .then((article) => {
        if(article) {
          // Pass the result of Mongoose's `.update` method to the next `.then`
          return article.update();
        } else {
          // If we couldn't find a document with the matching ID
          res.status(404).json({
            error: {
              name: 'DocumentNotFoundError',
              message: 'The provided ID doesn\'t match any documents'
            }
          });
        }
      })
      .then(() => {
        // If the deletion succeeded, return 204 and no JSON
        res.status(204).end();
      })
      // Catch any errors that might occur
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  });


 /**
 * Action:     DESTROY
 * METHOD:      DELETE 
 * URI:     /api/articles/5d664b8b68b4f5092aba18e9
 * description: delete an Article by artcle id
 */

 router.delete('/api/articles/:id',(req,res) => {
     Article.findById(req.params.id)
     .then((article) => {
         if (article){
             // pass the resuilt of mangooes '.delete' method to the next '.then'
            return article.remove();
         }else {
             // if we couldnt find  a doucument with the matching id 
             res.status(404).json ({
                 error: {
                     name: 'DocumentNotFoundError',
                     message: 'The provided ID doesn\'t match any documents'
                 }
             });
         }
     })
     .then(() => {
         // if the deletion succeeded,return 204 and no JSON
        res.status(204).end();
     })
     // catch any errors that might occure 
     .catch((error) => {
         res.status(500).json({error: error});
     })
 });


 /*** Comments CRUD */

 /* 
Action:      INDEX
Method:      GET
URI:        /api/articles/:articleId/comments
Description: Get all comments of a spacific article
*/
router.get('api/articles/:articleId/comments', (req, res) => {
    Article.findById(req.params.articleId, (error, article) => {
        res.send(article.comments)
    })
})


/* 
Action:      SHOW
Method:      GET
URI:        /api/articles/:articleId/comment/:commentId
Description: Get a spacific comment from a certain article
*/
router.get('/api/articles/:articleId/comments/:commentId', (req, res) => {
    // const articleId = req.params.articleId;
    const commentId = req.params.commentId;

    // find articleby ID
    Article.findById(req.params.articleId, (error, foundArticle) => {
        // find tweet in article
        const foundTweet = foundArticle.comments.id(commentId);
        res.send(foundTweet)
    })
})


/* 
Action:      CREATE
Method:      POST
URI:        /api/articles/:articleId/comments
Description: create a new comment for a spacific article
*/
router.post('/api/articles/:articleId/comments', (req, res) => {
    // creates the new comment
    const newComment = new Comment({
        commentText: req.body.commentText
    });
  

    // find the article by article Id and add new comment
    Article.findById(req.params.articleId, (error, foundArticle) => {
        foundArticle.comments.push(newComment);
        foundArticle.save((err, savedArticle) => {
            res.json(savedArticle)
        })
    })
})


/* 
Action:      UPDATE
Method:      PATCH
URI:        /api/articles/:articleId/comment/:commentId
Description: update a spacific comment for a spacific article
*/
router.patch('/api/articles/:articleId/comments/:commentId', (req, res) => {
    // set the value of the user and tweet ids
    const articleId = req.params.articleId;
    const commentId = req.params.commentId;
  
    // find user in db by id
    Article.findById(articleId, (err, foundArticle) => {
      // find tweet embedded in user
      const foundComment = foundArticle.comments.id(commentId);
      // update tweet text and completed with data from request body
      foundComment.commentText = req.body.commentText;
      foundArticle.save((err, savedArticle) => {
        res.json(foundComment);
      });
    });
});


/* 
Action:      DESTROY
Method:      DELETE
URI:        /api/articles/:articleId/comment/:commentId
Description: delete a spacific comment for a spacific article with article ID
*/
router.delete('/api/articles/:articleId/comments/:commentId', (req, res) => {
    // set the value of the user and tweet ids
    const articleId = req.params.articleId;
    const commentId = req.params.commentId;
    
    // find user in db by id
    Article.findById(articleId, (err, foundArticle) => {
        foundArticle.comments.id(commentId).remove();
        foundArticle.save();
        res.json(foundArticle);
    });
    
});

    

// export the router so we can use it in server.js file
module.exports = router;
