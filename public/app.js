#!/usr/bin/env node
'use strict';

const add = require('./commands/add').add;
const complete = require('./commands/complete').complete;
const deleted = require('./commands/delete').deleted;
const {list, printValues} = require('./commands/list');
const firstArgument = process.argv.slice(2)[0];
const taskString = process.argv.slice(3).join(' ');

switch(firstArgument){
  case 'add':
  try {
    add(taskString, (err, res) => {
      if(err) throw err
      process.stdout.write(`Created task ${res.id}\n`)
      process.exit()
    });
  } catch(e){
    process.stdout.write(`Error: ${e.message}\n`)
    process.exit()
  }
    break;
  case 'complete':
    try{
      complete(taskString, (err, res) => {
        if(err) throw err
        process.stdout.write(`Completed task ${res.id}: ${res.todo_task}\n`)
        process.exit()
      });
    } catch(e){
      process.stdout.write(`${e.message}\n`)
      process.exit()
    }
    break;
  case 'delete':
    try{
      deleted(taskString, (err, res) => {
        if(err) throw err
        if(res === undefined){
          process.stdout.write(`You do not have tasks with that id number: ${taskString}\n`)
        } else {
          process.stdout.write(`Deleted task ${res.id}: ${res.todo_task}\n`)
        }
        process.exit()
      });
    } catch(e){
      process.stdout.write(e.message)
      process.exit()
    }
    break;
  case 'list':
    try {
      list((err, res) => {
        if(err) throw err
        console.log(res)
        printValues(res)
        process.exit()
      })
      } catch(e) {
        process.stdout.write(`Error: ${e.message}`)
        process.exit()
    }
    break;
  default:
  if(!module.parent){
    process.stdout.write('Error: not a correct command, please try again\n')
    process.exit()
  }
}

module.exports = {add, complete, deleted, list}