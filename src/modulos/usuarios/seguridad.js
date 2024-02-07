const auth = require('../../auth')

module.exports = function verificarAuth() {
  function middleware(req, res, next) {
    const id = req.body.id
    auth.validarToken.confirmarToken(req, id)
    next()
  }
  return middleware
}
