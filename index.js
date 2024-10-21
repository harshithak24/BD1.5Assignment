const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

app.use(express.static('static'));

function carttotal(newItemPrice, cartTotal) {
  let total = newItemPrice + cartTotal;
  return total;
}

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(carttotal(newItemPrice, cartTotal).toString());
});

function membership(cartTotal, isMember) {
  let total;
  if (isMember) {
    let Discount_Amount = cartTotal * 0.1;
    let total = cartTotal - Discount_Amount;
    return total.toString();
  } else {
    return cartTotal.toString();
  }
}

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  res.send(membership(cartTotal, isMember));
});

function calculateTax(cartTotal) {
  let Discount_Amount = cartTotal * 0.05;
  return Discount_Amount.toString();
}

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  res.send(calculateTax(cartTotal));
});

function deliveryEstimate(shippingMethod, distance) {
  let deliverydays;
  if (shippingMethod == 'express') {
    deliverydays = distance / 100;
    return deliverydays.toString();
  } else {
    deliverydays = distance / 50;
    return deliverydays.toString();
  }
}

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(deliveryEstimate(shippingMethod, distance));
});

function shippingcost(weight, distance) {
  let shipping_cost = weight * distance * 0.1;
  return shipping_cost.toString();
}

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send(shippingcost(weight, distance));
});

function loyaltypoints(purchaseAmount) {
  let loyalty_points = purchaseAmount * 2;
  return loyalty_points.toString();
}

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(loyaltypoints(purchaseAmount));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
