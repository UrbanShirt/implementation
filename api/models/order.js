const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
