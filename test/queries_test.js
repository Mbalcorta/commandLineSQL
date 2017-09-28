const {expect, mocha} = require('./app_test')
const {client} = require('../database/client')
const queries = require('../public/app')

describe("Add function", function(){
  beforeEach((done) => {
     client.then((response) => {
      response.query('DROP TABLE tasks; CREATE TABLE tasks(id SERIAL PRIMARY KEY, todo_task varchar(255) NOT NULL,completed boolean NOT NULL DEFAULT FALSE);', (error) => {
        done(error)
      })
    })
  })
  describe('when given a task', function() {
    it("it will post task to database", function(done){
      queries.add('walk the dogs', (err, res) => {
          if(err) throw err
          expect(res.todo_task).to.eql('walk the dogs')
         done()
        })
      })
    })
  describe('when given two tasks', function() {
    it("it will posts both tasks to the database", function(done){
      queries.add('go fishing', (err, res) => {
        queries.add('walk the dog', (err, res) => {
          expect(res.id).to.eql(2)
          done()
        })
      })
    })
  })
  describe('when no task given', function() {
    it("it will throw an error", function(done){
      expect(function(){
        queries.add('', (err, res) => {})
      }).to.throw('must enter task')
      done()
    })
  })
})

describe("Complete function", function(){
  beforeEach((done) => {
     client.then((response) => {
      response.query('DROP TABLE tasks; CREATE TABLE tasks(id SERIAL PRIMARY KEY, todo_task varchar(255) NOT NULL,completed boolean NOT NULL DEFAULT FALSE);', (error) => {
      queries.add('walk the dogs', (err, res) => {
        queries.add('take baby to the park', (err, res) => {
          queries.add('have a beer', (err, res) => {
              done()
            })
          })
        })
      })
    })
  })
  describe('When items marked as complete', function() {
    it("it will change complete value to true", function(done){
      queries.complete('3', (err, res) => {
        if(err) console.log(err)
        expect(res.completed).to.eql(true)
        done()
      })
    })
  })
  describe('when no task number given', function() {
    it("it will throw an error", function(done){
      expect(function(){
        queries.complete('', (err, res) => {})
      }).to.throw('must enter task number')
        done()
    })
  })
})

describe("List function", function(){
  beforeEach((done) => {
    client.then((response) => {
      response.query('DROP TABLE tasks; CREATE TABLE tasks(id SERIAL PRIMARY KEY, todo_task varchar(255) NOT NULL,completed boolean NOT NULL DEFAULT FALSE);', (error) => {
        queries.add('walk the dogs', (err, res) => {
          queries.add('take baby to the park', (err, res) => {
            queries.add('have a beer', (err, res) => {
              done()
            })
          })
        })
      })
    })
  })
  describe('When items listed', function() {
    it("it will return all items that are not completed", function(done){
      queries.list((err, res) => {
        if(err) console.log(err)
        expect(res.length).to.eql(3)
        done()
      })
    })
  })
  describe('When one item out of three is complete', function() {
    beforeEach(function(done){
      queries.complete('1', (err, res) => {
        if(err) throw error
        done()
      })
    })
    it("it will return two items that are not completed", function(done){
      queries.list((err, res) => {
        if(err) console.log(err)
        expect(res.length).to.eql(2)
        done()
      })
    })
  })
})

describe("Deleted function", function(){
  beforeEach((done) => {
     client.then((response) => {
      response.query('DROP TABLE tasks; CREATE TABLE tasks(id SERIAL PRIMARY KEY, todo_task varchar(255) NOT NULL,completed boolean NOT NULL DEFAULT FALSE);', (error) => {
      queries.add('walk the dogs', (err, res) => {
        queries.add('take baby to the park', (err, res) => {
          queries.add('have a beer', (err, res) => {
              done()
            })
          })
        })
      })
    })
  })
  describe('When items deleted', function() {
    it("it will delete item from database with correct task", function(done){
      queries.deleted('3', (err, res) => {
        if(err) console.log(err)
         expect(res.todo_task).to.eql('have a beer')
        done()
      })
    })
  })
  describe('when item number is not entered deleted function', function() {
    it("it will throw an error", function(done){
      expect(function(){
        queries.deleted('', (err, res) => {})
      }).to.throw('must enter task number')
        done()
    })
  })
  describe('When items deleted', function() {
    it("it will delete item from database with correct task", function(done){
      queries.deleted('4', (err, res) => {
        if(err) console.log(err)
         expect(res).to.be.undefined
        done()
      })
    })
  })
})