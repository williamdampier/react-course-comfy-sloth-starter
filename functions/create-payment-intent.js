//domain/.netlify/functions/create-payment-intent.js

exports.handler = async function (event, context) {
  if (event.body) {
    const { cart, shipping_fee, total_amount } = JSON.parse(event.body);

    return {
      statusCode: 200,
      body: JSON.stringify(cart),
    };
  } else {
    return { statusCode: 200, body: 'Create Payment Intent' };
  }
};
