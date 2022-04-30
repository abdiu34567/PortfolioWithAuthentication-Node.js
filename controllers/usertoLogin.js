module.exports = (req, res) => {
  var email = req.session.email
  req.session.email = null
  if (email != null) {
    return res.render('login', {
      errors: 'Email or Password Wrong',
      email: email,
    })
  } else {
    return res.render('login')
  }
}
