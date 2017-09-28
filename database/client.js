const {Client} = require('pg')
const database = process.env.NODE_ENV !== 'test'
  ? 'postgresql://localhost:5432/todo_list'
  : 'postgresql://localhost:5432/todo_list_test'
const connectionString = process.env.DATABASE_URL || database

const clientConnect = (connectionString) => {

  const client = new Client({
    connectionString: connectionString
  })

  return new Promise((resolve, reject) => {
  client.connect((err, client) => {
      if(err){
        reject(err.message)
      } else {
        resolve(client)
      }
    })
  })
}

const client = clientConnect(connectionString)

module.exports = {client, Client, clientConnect}