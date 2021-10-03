const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async (req, res) => {
  const { sessionId, email } = req.body
  const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId)

  const returnUrl = process.env.HOST

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: checkoutSession.customer,
    return_url: returnUrl,
  })

  res.status(200).json({ url: portalSession.url })
}
