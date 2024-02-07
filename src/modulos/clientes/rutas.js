const express = require('express')

const respuestas = require('../../red/respuestas')
const controlador = require('./index')

const router = express.Router()

router.get('/', todos)
router.get('/:id', uno)
router.post('/', agregar)
router.delete('/', eliminar)

async function todos(req, res, next) {
  try {
    const items = await controlador.todos()  
    respuestas.success(req, res, items, 200)  
  } catch(err) {
    next(err)
  }  
}

async function uno(req, res, next) {
  try {
    const items = await controlador.uno(req.params.id)  
    respuestas.success(req, res, items, 200)  
  } catch(err) {
    next(err)
  }  
}

async function agregar(req, res, next) {
  try {
    console.log(req.body)
    const items = await controlador.agregar(req.body)  
    if(req.body.fiIdCliente == undefined) { 
      mensaje = 'Item guardado con éxito.'
    } else {
      mensaje = 'Item actualizado con éxito.'
    }
    respuestas.success(req, res, mensaje, 201)  
  } catch(err) {
    next(err)
  }  
}

async function eliminar (req, res, next) {
  try {
    const item = await controlador.eliminar(req.body)  
    respuestas.success(req, res, 'Item eliminado correctamente.', 200)  
  } catch(err) {
    next(err)
  }  
}

module.exports = router