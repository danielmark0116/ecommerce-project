require("dotenv").config();
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const _ = require("lodash");
const Order = require("../model/order.model");
const mailer = require("../utils/mailer");

exports.startPayment = async (req, res) => {
  const userData = jwt.decode(req.headers.authorization.split(" ")[1]);
  const userEmail = userData.email;
  const userId = userData.userId;
  const { orderId, amount } = req.body;

  let orderData = await Order.findOne({ _id: orderId });

  if (orderData && orderData.status === "init") {
    // BEFORE ALL THAT
    // Fetch the order by id and check if the status in INIT
    // if it is, then you can create session and generate payment

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        client_reference_id: userId.toString(),
        customer_email: userEmail,
        line_items: [
          {
            name: `Order ${orderId}`,
            description: "ECOMMERCE Order",
            amount: _.round(amount * 100, 0),
            currency: "usd",
            quantity: 1
          }
        ],
        success_url:
          process.env.MODE === "production"
            ? "https://grychtol.com.pl/payment-success/{CHECKOUT_SESSION_ID}"
            : "http://localhost:3000/payment-success/{CHECKOUT_SESSION_ID}",
        cancel_url:
          process.env.MODE === "production"
            ? `https://grychtol.com.pl/order/${orderId}`
            : `http://localhost:3000/order/${orderId}`
      });

      res.json({
        success: true,
        error: false,
        msg: "Initialized payment",
        sessionId: session.id
      });
    } catch (e) {
      res.status(500).json({
        success: false,
        fail: true,
        msg: e.message
      });
    }
  } else {
    res.status(500).json({
      success: false,
      fail: true,
      msg: "Order is either paid already or the payment is processing"
    });
  }
};

const errorResponse = (res, msg) => {
  return res.json({
    error: true,
    msg
  });
};

exports.fullfillPayment = async (req, res) => {
  const userData = jwt.decode(req.headers.authorization.split(" ")[1]);
  const userEmail = userData.email;
  const userName = userData.name;
  const userId = userData.userId;
  const paymentSessionId = req.body.sessionId;

  try {
    let response = await stripe.checkout.sessions.retrieve(paymentSessionId);

    const piId = await response.payment_intent;
    const customerEmail = await response.customer_email;
    const customerId = await response.client_reference_id;
    const orderId = await response.display_items[0].custom.name.split(" ")[1];

    // FINDING THE ORDER IN DB
    let orderData = await Order.findOne({ _id: orderId });

    if (
      orderData &&
      orderData.userEmail === customerEmail &&
      orderData.userEmail === userEmail
    ) {
      // ORDER IS IN DB
      if (orderData.status === "init") {
        let pIntentData = await stripe.paymentIntents.retrieve(piId);

        const pIStatus = await pIntentData.status;

        if (pIStatus === "succeeded" || pIStatus === "processing") {
          orderData.status =
            pIStatus === "succeeded"
              ? "paid"
              : pIStatus === "processing"
              ? "processing"
              : "init";

          orderData.paymentIntentId = piId;
          orderData.paymentDate = Date.now();

          await orderData.save();

          mailer.paymentFullfill(userEmail, "Payment success", {
            userName,
            orderId: orderData._id
          });

          res.json({
            msg: "Order is in DB, payment fullfilled",
            newOrderData: orderData,
            success: true,
            error: false
          });
        } else {
          orderData.paymentIntentId = piId;

          await orderData.save();

          errorResponse(res, "Payment intent is not succeded");
        }
      } else {
        errorResponse(res, "Order is not init");
      }
    } else {
      errorResponse(res, "wrong order data");
    }
  } catch (e) {
    res.json({
      paymentSessionId,
      error: true,
      msg: e.message
    });
  }
};

exports.redirect = async (req, res) => {
  console.log("redirecting");
  try {
    const redirect = await stripe.redirectToCheckout({
      sessionId: req.params.id
    });

    console.log(redirect);
  } catch (e) {
    console.log(e.message);
  }
};
