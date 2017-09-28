'use strict';
const client = require('../../database/client').client

const errorHandler = (e) => {
  console.log('error', e)
  if(!module.parent){
      console.log(e)
  }
}

const successHandler = (response, task, sqlQuery, callback) => {
  response.query(sqlQuery, [task], (error, result) => {
    if(error) {
      console.log(error)
      callback(error)
    } else {
      callback(null, result.rows[0])
    }
  })
}

const database = (task, sqlQuery, callback) => {
  client
  .then((response) => {
    successHandler(response, task, sqlQuery, callback)
  })
  .catch(errorHandler)
}

module.exports = {database}