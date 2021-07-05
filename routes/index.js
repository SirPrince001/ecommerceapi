const route = require("express").Router();

route.use(require("./categoryRoute"));
route.use(require("./productRoute"));
route.use(require("./user"))
route.use(require('./order'))
module.exports = route;
