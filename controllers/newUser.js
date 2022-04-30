module.exports = (req, res) => {
  var first = '',
    last = '',
    email = ''
  const data = req.flash('data')[0]
  // check inputs if not null
  if (typeof data != 'undefined') {
    first = data.first
    last = data.last
    email = data.email
  }
  const errorFound = req.flash('validationErrors')[0]
  if (typeof errorFound != 'undefined') {
    errors = 'Email is Already Taken, Please Use Diffrent'
  } else {
    errors = null
  }

  if (req.session.password == false) {
    req.session.password = null
    var sessiondata = req.session.data
    req.session.data = null

    return res.render('register', {
      passworderor: 'Password Not Matched',
      first: sessiondata.first,
      last: sessiondata.last,
      email: sessiondata.email,
    })
  }

  return res.render('register', { errors, first, last, email })
}
