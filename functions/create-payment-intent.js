//domain/.netlify/functions/create-payment-intent.js
require('dotenv').config();

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
  if (event.body) {
    const { shipping_fee, total_amount } = JSON.parse(event.body);

    const totalCost = () => {
      return shipping_fee + total_amount;
    };

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalCost(),
        currency: 'usd',
      });
      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {}
  } else {
    return { statusCode: 200, body: 'Create Payment Intent' };
  }
};
