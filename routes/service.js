var express = require('express');
var router = express.Router();

// 分类管理
var CategoryRouter = express.Router();
var CatService = require('../service/category');

CategoryRouter.post('/add', CatService.add);
CategoryRouter.post('/del', CatService.del);
CategoryRouter.post('/mod', CatService.mod);
CategoryRouter.get('/query', CatService.query);

router.use('/category/', CategoryRouter);

// 错误码管理
var CodeRouter = express.Router();
var CodeService = require('../service/code');

CodeRouter.post('/add', CodeService.add);
CodeRouter.post('/del', CodeService.del);
CodeRouter.post('/mod', CodeService.mod);
CodeRouter.get('/query', CodeService.query);

router.use('/code/', CodeRouter);

module.exports = router;