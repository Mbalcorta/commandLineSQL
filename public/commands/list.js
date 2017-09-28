'use strict';
const client = require('../../database/client').client

const errorHandler = (e) => {
  console.log('error', e)
  if(!module.parent){
      console.log(e)
  }
}

const successHandler = (response, callback) => {
  response.query('SELECT * FROM tasks WHERE completed=false ORDER BY id ASC;', (error, result) => {
    if(error) {
      callback(error)
    } else {
      callback(null, result.rows)
    }
  })
}

const database = (callback) => {
  client
  .then((response) => {
    successHandler(response, callback)
  })
  .catch(errorHandler)
}

const list = (callback) => {
    database(callback)
}

const printValues = (responseArray) => {
  process.stdout.write(`ID  Description\n`)
  process.stdout.write(`--  -----------\n`)
  if(responseArray.length){
    responseArray.forEach((eachElement) => {
    process.stdout.write(` ${eachElement.id}   ${eachElement.todo_task}\n`)
    })
    process.stdout.write(`\n You have ${responseArray.length} tasks\n`)
  } else {
    process.stdout.write(`you have 0 tasks\n`)
  }
}

module.exports = {list, printValues}