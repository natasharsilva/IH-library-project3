function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) next()
  else next({ status: 403, message: 'Unauthorized' })
}

function isAdmin(req, res, next) {
  if (req.user.role === "admin") next()
  else next({ status: 403, message: 'Unauthorized' })
}

module.exports = {
  isLoggedIn,
  isAdmin
}
