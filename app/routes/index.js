// require nessary NPM packages 
const express = require('express');
// instantatee a Router (mini app that only handles routes)
const router = express.Router();

/** 
 *  Action:      Index
 * Method:        GET
 * URI:            /
 * Description: Get the Root Route
 */
router.get('/',(req,res) => {
    res.json({ message: 'welcome to blogy'});
});

// export the Router so we can use it in the server.js file 
module.exports = router;