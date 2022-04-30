module.exports = (req, res, next) => {
  if (req.session.userId) {
    const session = req.session
    return res.render('index', {
      user: session,
      loggedIn: session.userId,
    })
  }
  next()
}
