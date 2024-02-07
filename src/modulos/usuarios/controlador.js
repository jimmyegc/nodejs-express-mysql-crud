const auth = require('../auth')
const TABLA = 'usuario'

module.exports = function (dbInyectada) { 

  let db = dbInyectada

  if(!db) db = require('../../db/mysql')
      
  function todos() {
    return db.todos(TABLA)
  }

  function uno(id) {
    return db.uno(TABLA, id)
  }

  async function agregar(body) {  
    const usuario = { 
      fiIdUsuario: body.fiIdUsuario,
      fcNombre: body.fcNombre,
      fbEstatus: body.fbEstatus
    }
    const respuesta = await db.agregar(TABLA, usuario)
    var insertId = 0
    if(body.fiIdUsuario == 0) { 
      insertId = respuesta.insertId
    } else {
      insertId = body.fiIdUsuario
    }
    let respuesta2 = ''
    if(body.fcUsuario || body.fcPassword) {
      respuesta2 = await auth.agregar({
        fiIdUsuario: insertId,
        fcUsuario: body.fcUsuario,
        fcPassword: body.fcPassword
      })
    }
    return respuesta2
  }

  function eliminar(body) {
    return db.eliminar(TABLA, body)
  }

  return {
    todos, 
    uno,
    agregar,
    eliminar
  }
  
}