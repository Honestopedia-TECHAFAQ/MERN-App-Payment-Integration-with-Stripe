const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.get('/', (req, res) => {
  res.send('Welcome to the MERN Stripe App');
});

app.post('/create-payment-intent', async (req, res) => {
  const { currency } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 5000, 
    currency,
  });
  
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
