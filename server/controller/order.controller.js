const jwt = require("jsonwebtoken");
const Order = require("../model/order.model");
const Product = require("../model/product.model");
const mailer = require("../utils/mailer");

exports.getOrderById = async (req, res) => {
  const userData = jwt.decode(req.headers.authorization.split(" ")[1]);
  const userEmail = userData.email;

  try {
    let response = await Order.findOne({ _id: req.params.id }, [
      "-paymentIntentId"
    ]);

    if (response.userEmail === userEmail) {
      res.json({
        orders: [response],
        error: false,
        success: true,
        msg: "Authorized. Access to data about the order"
      });
    } else {
      res.status(401).json({
        error: true,
        success: false,
        msg: "Order user does not match user making the request"
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
  const userData = jwt.decode(req.headers.authorization.split(" ")[1]);
  const userEmail = userData.email;
  const userName = userData.name;
  const userId = userData.userId;

  const cartItems = req.body.cart;

  cartItems.forEach(item => {
    let sizes = item.quantity; // quantity of items sizes in cart
    let productId = item._id;

    Product.findOne({ _id: productId }, async (err, prod) => {
      if (err) throw err;

      const soldQ = Object.values(sizes).reduce((a, b) => a + b);

      await prod
        .updateOne({
          size: {
            xs: prod.size.xs - sizes.xs,
            s: prod.size.s - sizes.s,
            m: prod.size.m - sizes.m,
            l: prod.size.l - sizes.l,
            xl: prod.size.xl - sizes.xl,
            xxl: prod.size.xxl - sizes.xxl
          },
          soldItems: {
            xs: prod.soldItems.xs + sizes.xs,
            s: prod.soldItems.s + sizes.s,
            m: prod.soldItems.m + sizes.m,
            l: prod.soldItems.l + sizes.l,
            xl: prod.soldItems.xl + sizes.xl,
            xxl: prod.soldItems.xxl + sizes.xxl
          },
          sold: soldQ
        })
        .then(newProd => null)
        .catch(e => console.log("Order controller error: " + e.message));
    });
  });

  const newOrderData = {
    ...req.body,
    userId,
    userEmail,
    userName,
    status: "init"
  };

  try {
    let newOrder = await new Order(newOrderData).save();

    mailer.orderCreate(userEmail, "New Order", {
      userName,
      orderId: newOrder._id
    });

    res.json({
      orders: new Array(newOrder),
      success: true,
      error: false,
      msg: "Created new order"
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: true,
      msg: e.message
    });
  }
};

exports.getUsersActiveOrdersQ = async (req, res) => {
  const userData = jwt.decode(req.headers.authorization.split(" ")[1]);
  const userId = userData.userId;

  try {
    let response = await Order.countDocuments({
      userId,
      status: { $in: ["init", "paid", "processing", "sent"] }
    });

    res.json({
      response,
      success: true,
      error: false,
      msg: "Checked the number of users active orders"
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
  const userData = jwt.decode(req.headers.authorization.split(" ")[1]);
  const userId = userData.userId;

  try {
    let response = await Order.find({ userId }, [
      "_id",
      "userId",
      "userEmail",
      "status",
      "totalValue",
      "deliveryValue",
      "status"
    ]).sort({ createdAt: "desc" });

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

exports.getUsersOrdersInChunks = async (req, res) => {
  const userData = jwt.decode(req.headers.authorization.split(" ")[1]);
  const userId = userData.userId;
  const skipValue = parseInt(req.params.skip);
  const limitValue = parseInt(req.params.limit);

  try {
    let allOrersQuantity = await Order.countDocuments();

    let response = await Order.find({ userId }, [
      "_id",
      "userId",
      "userEmail",
      "status",
      "totalValue",
      "deliveryValue",
      "status"
    ])
      .sort({ createdAt: "desc" })
      .skip(skipValue)
      .limit(limitValue);

    //   _id: string;
    // userId: string;
    // userEmail: string;
    // status: string;
    // totalValue: number;

    res.json({
      success: true,
      error: false,
      response,
      ordersQuantity: allOrersQuantity
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: true,
      msg: e.message
    });
  }
};
