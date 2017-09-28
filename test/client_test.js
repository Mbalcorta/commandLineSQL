const {expect, mocha} = require('./app_test')
const {clientConnect} = require('../database/client')

describe("Database connection", function(){
  context('when given a correct database connection', function() {
    const database = 'todo_list_test'
    const connectionString = `postgresql://localhost:5432/${database}`
    it("it will connect to the database given", function(done){
      clientConnect(connectionString).then(function(response){
      expect(response.database).to.eql(database)
      done()
      })
    })
  })

  context('when given an incorrect database connection', function() {
    const database = 'meowtodo_list'
    const connectionString = process.env.DATABASE_URL || `postgresql://localhost:5432/${database}`
    it("it will not connect to the database given", function(done){
      clientConnect(connectionString).then(function(response){
      })
      .catch(function(e){
        expect(e).to.eql(`database "${database}" does not exist`)
        done()
      })
    })
  })
})

