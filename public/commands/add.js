'use strict';
const client = require('../../database/client').client

const {database} = require('./helper')

const sqlQuery = 'INSERT INTO tasks(todo_task) VALUES($1) RETURNING *'

const add = (task, callback) => {
  if(task.length > 0){
    database(task, sqlQuery, callback)
  } else {
    throw new Error('must enter task')
  }
}

module.exports = {add}