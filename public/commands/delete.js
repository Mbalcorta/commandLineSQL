'use strict';
const client = require('../../database/client').client

const {database} = require('./helper')

const sqlQuery = 'DELETE FROM tasks WHERE id=$1 RETURNING *;'

const deleted = (taskNumber, callback) => {
  if(taskNumber.length > 0){
    database(taskNumber, sqlQuery, callback)
  } else {
    throw new Error('must enter task number')
  }
}

module.exports = {deleted}