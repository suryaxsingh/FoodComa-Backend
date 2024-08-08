const express = require('express');
const { getCartById } = require('../controllers/cartControllers');

const cartRouter = express.Router();

cartRouter.get('/:id', getCartById);

module.exports = cartRouter;