require('dotenv').config();
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.startPayment = async (req, res) => {
  const userData = jwt.decode(req.headers.authorization.split(' ')[1]);
  const userEmail = userData.email;
  const userId = userData.userId;
  const { orderId, amount } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      client_reference_id: userId.toString(),
      customer_email: userEmail,
      line_items: [
        {
          name: `Order ${orderId}`,
          description: 'ECOMMERCE Order',
          amount: amount * 100,
          currency: 'usd',
          quantity: 1
        }
      ],
      success_url:
        'http://localhost:3000/payment-success/{CHECKOUT_SESSION_ID}',
      cancel_url: `http://localhost:3000/order/${orderId}`
    });

    res.json({
      success: true,
      error: false,
      msg: 'Initialized payment',
      sessionId: session.id
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      fail: true,
      msg: e.message
    });
  }
};

exports.redirect = async (req, res) => {
  console.log('redirecting');
  try {
    const redirect = await stripe.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: req.params.id
    });

    console.log(redirect);
  } catch (e) {
    console.log(e.message);
  }
};
