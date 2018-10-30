var express = require('express');
var router = express.Router();

const MODULE_PATH = '/api';

// GET home page
router.get(MODULE_PATH + '/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// Routes of Modules
const routes = [
  require('../modules/todo/routes/todo.routes'),
]

// Use routes on modules 
routes.forEach(r => {
  router.use(MODULE_PATH, r)
})

module.exports = router;
