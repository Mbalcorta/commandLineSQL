'use strict';
const client = require('../../database/client').client

const {database} = require('./helper')

const sqlQuery = 'UPDATE tasks SET completed=true WHERE id=$1 RETURNING *;'

const complete = (taskNumber, callback) => {
  if(taskNumber.length > 0){
    database(taskNumber, sqlQuery, callback)
  } else {
    throw new Error('must enter task number')
  }
}

module.exports = {complete}