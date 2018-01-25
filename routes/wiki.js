const router = require('express').Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

// everything with /wiki will be routed here
router.get('/', function(req, res, next) {
  res.redirect('/');
});

// router.post('/', function(req, res, next) {
//   res.json(req.body);
// });

// everything with /wiki/add will be routed here
router.get('/add', function(req, res, next) {
  res.render('addpage');
});

router.get('/:urlTitle', function (req, res, next) {
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    },
    include: [
      {model: User,
      as: 'author'}
    ]
  })
  .then(function(foundPage){
    res.render('wikipage', {
      page: foundPage
    })
  })
  .catch(next);
});

router.post('/', function(req, res, next) {
  User.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email
    }
  })
  .then(function([foundOrCreatedUser, bool]){
    var page = Page.build({
      title: req.body.title,
      urlTitle: req.body.urlTitle,
      content: req.body.content
    });
    // make sure we only redirect *after* our save is complete!
    // note: `.save` returns a promise or it can take a callback.
    page.save()
    .then(function(createdPage){
      return createPage.setAuthor(foundOrCreatedUser)
    })
    .then(function(page){
      res.redirect(page.route);
    })
  })


  .catch(next);
  // -> after save -> res.redirect('/');
});


module.exports = router;
