const jwt = require('jsonwebtoken');
const Order = require('../model/order.model');

exports.getOrderById = async (req, res) => {
  const userData = jwt.decode(req.headers.authorization.split(' ')[1]);
  const userEmail = userData.email;

  try {
    let response = await Order.findOne({ _id: req.params.id }, [
      '-paymentIntentId'
    ]);

    if (response.userEmail === userEmail) {
      res.json({
        orders: [response],
        error: false,
        success: true,
        msg: 'Authorized. Access to data about the order'
      });
    } else {
      res.status(401).json({
        error: true,
        success: false,
        msg: 'Order user does not match user making the request'
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      error: true,
      msg: e.message
    });
  }
};

exports.createOrder = async (req, res) => {
  const userData = jwt.decode(req.headers.authorization.split(' ')[1]);
  const userEmail = userData.email;
  const userName = userData.name;
  const userId = userData.userId;

  const newOrderData = {
    ...req.body,
    userId,
    userEmail,
    userName,
    status: 'init'
  };

  try {
    let newOrder = await new Order(newOrderData).save();

    res.json({
      orders: new Array(newOrder),
      success: true,
      error: false,
      msg: 'Created new order'
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: true,
      msg: e.message
    });
  }
};

exports.getUsersOrders = async (req, res) => {
  const userData = jwt.decode(req.headers.authorization.split(' ')[1]);
  const userId = userData.userId;

  try {
    let response = await Order.find({ userId }, [
      '_id',
      'userId',
      'userEmail',
      'status',
      'totalValue',
      'deliveryValue',
      'status'
    ]).sort({ createdAt: 'desc' });

    //   _id: string;
    // userId: string;
    // userEmail: string;
    // status: string;
    // totalValue: number;

    res.json({
      success: true,
      error: false,
      response
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: true,
      msg: e.message
    });
  }
};
