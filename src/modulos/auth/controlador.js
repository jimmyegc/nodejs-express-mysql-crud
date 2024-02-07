const bcrypt = require('bcrypt')
const auth = require('../../auth')
const TABLA = 'auth'

module.exports = function (dbInyectada) { 

  let db = dbInyectada
  if(!db) db = require('../../db/mysql')

  async function login(fcUsuario, fcPassword) {
    const data = await db.query(TABLA, { fcUsuario: fcUsuario })
    return bcrypt.compare(fcPassword, data.fcPassword)
      .then(resultado => {
        if(resultado) { // Generar Token
          return auth.asignarToken({ ...data })
        } else {
          throw new Error('Información inválida.')
        }
      })
  }
      
  async function agregar(data) { 
    const authData = { 
      fiIdUsuario: data.fiIdUsuario,
    } 
    if(data.fcUsuario) authData.fcUsuario = data.fcUsuario
    if(data.fcPassword) authData.fcPassword = await bcrypt.hash(data.fcPassword.toString(), 3)

    return db.agregar(TABLA, authData)
  }

  return {
    login,
    agregar
  }
  
}