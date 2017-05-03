//ExpectJS provides the assertions for test cases
const expect = require('expect');
// Supertest provides request object to test RESTFUL services
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

// seed the database
const todos = [{
  _id: new ObjectID(),
  text: 'Mocha test todo 1'
}, {
  _id: new ObjectID(),
  text: 'Mocha test todo 2'
}];

// Before each runs everytime before all the test cases
beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

// All post routes test cases under describe
describe('POST /todos', () => {
  //new todo creation
  it('should create a new todo', (done) => {
    var text = 'Test data';
    request(app)
      .post('/todos')
      .send({text}) // ES6 styles
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        //find this particular test text
        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });
  // check for required st
  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

// All GET routes test cases under describe
describe('GET /todos', () => {
  // list all todos
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2); // as 2 todos are seeded into the database
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  // get an individual one
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });
  // objectID not found
  it('should return 404 if todo objectID not found', (done) => {
    var hexId = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });
  // invalid objectID
  it('should return 404 for non-object ids (Invalid)', (done) => {
    request(app)
      .get('/todos/123abc')
      .expect(404)
      .end(done);
  });
});

// All DELETE routes test cases under describe
describe('DELETE /todos/:id',()=>{
  it('should delete the todo', (done)=>{
    var hexId = todos[1]._id.toHexString();
    request(app)
    .delete(`/todos/${hexId}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todos._id).toBe(hexId);
    })
    .end((err,res) =>{
      if(err){
        return done(err);
      }
      //find this particular test text
      Todo.findById(hexId).then((todo) => {
        expect(todo).toNotExist();
        done();
      }).catch((e) => done(e));      
    })
  });
  
  it('should return 404 for todo not found',(done)=>{
      
  });
  
  it('should return 404 if invalid ObjectIDs given', (done)=>{
    
  });
  
});