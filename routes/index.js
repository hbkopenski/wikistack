const wikiRouter = require('./wiki');
const userRouter = require('./user');
const router = require('express').Router();

//middleware routing back to home page (also can be put in app.js)
// router.get('/', function(req, res, next){
//   Page.findAll()
//   .then(function(pages){
//     res.render('index', {
//       pages: pages
//     })
//   })
//   .catch(next);
// })

router.use('/wiki', wikiRouter);
router.use('/user', userRouter);
module.exports = router;
