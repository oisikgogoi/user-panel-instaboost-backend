const Router = require('express').Router()
const { 
    getData,
  } = require('../controllers/appControllers')

const validateToken = require('../middlewares/validateToken')

Router.use(validateToken)

Router.route('/getData').get(getData)


module.exports = Router