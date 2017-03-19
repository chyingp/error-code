var express = require('express');
var router = express.Router();
var CatService = require('../service/category');

var CategoryRouter = express.Router();

CategoryRouter.post('/add', CatService.add);
CategoryRouter.post('/del', CatService.del);
CategoryRouter.post('/mod', CatService.mod);
CategoryRouter.get('/query', CatService.query);

router.use('/category/', CategoryRouter);

module.exports = router;