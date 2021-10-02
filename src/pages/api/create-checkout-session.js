const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async (req, res) => {
  const { email, priceId } = req.body

  const session = await stripe.checkout.sessions.create({
    billing_address_collection: 'auto',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        // For metered billing, do not pass quantity
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: 'http://localhost:3000',
    cancel_url: 'http://localhost:3000/complete-purchase',
    metadata: {
      email,
    },
  })

  res.status(200).json({ id: session.id })
}
