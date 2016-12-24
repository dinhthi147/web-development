var server = require('../app');
var User = require('../Lib/users.js');
var mysql = require('mysql');
var assert = require('assert');
var should = require('should');
var request = require('supertest');
describe('Access to DB', function(){
   describe('Test case 1: fail', function(){
        it('should return 7 because wrong credentials', function(done){
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'tttt',
                database: 'YACOFFEE'
            });
            connection.connect(function(err){
                assert.equal(7,err.stack.indexOf("ER_ACCESS_DENIED_ERROR"));
                done();
            });
        });
    })
    describe('Test case 2: success', function(){
         it('should be success because right credentials', function(done){
           var connection = mysql.createConnection({
                 host: 'localhost',
                 user: 'root',
                 password: 'toor',
                 database: 'YACOFFEE'
             });
             connection.connect(done);
         });
     })
});

describe('Test User Class', function() {
  describe('Load user with id from database', function() {
    it('Test case 3: should return user with id = 1 in database', function(done) {
      var user = {
        id: 1,
        username: 'normal',
        password: '123',
        idGoogle: null,
        idFacebook: null,
        name: 'normal user',
        phone: '01699924568',
        email: 'gacon@yahoo.com',
        address: null,
        role: 'member'
      }
      User.findById(1, function(error, rows){
        JSON.stringify(rows).should.be.equal(JSON.stringify(user))
        done();
      });
    });

    it('Test case 4: should return undefined user with id = 999 in database', function(done) {
      User.findById(999, function(error, rows){
        assert.equal(rows, undefined)
        done();
      });
    });

    it('Test case 5: should return user with idFacebook = 100009062588234 in database', function(done) {
      var user = {
        id: 3,
        username: null,
        password: null,
        idGoogle: null,
        idFacebook: '100009062588234',
        name: 'facebook user',
        phone: '01699924568',
        email: 'gacon@yahoo.com',
        address: null,
        role: 'manager'
      }
      User.findByFacebookID('100009062588234', function(error, rows){
        JSON.stringify(rows).should.be.equal(JSON.stringify(user))
        done();
      });
    });

    it('Test case 6: should return undefined user with idFacebook = 00000000000005 in database', function(done) {
      User.findByFacebookID('00000000000005', function(error, rows){
        assert.equal(rows, undefined)
        done();
      });
    });

    it('Test case 7: should return user with username = normal in database', function(done) {
      var user = {
        id: 1,
        username: 'normal',
        password: '123',
        idGoogle: null,
        idFacebook: null,
        name: 'normal user',
        phone: '01699924568',
        email: 'gacon@yahoo.com',
        address: null,
        role: 'member'
      }
      User.findByUsername('normal', function(error, rows){
        JSON.stringify(rows).should.be.equal(JSON.stringify(user))
        done();
      });
    });

    it('Test case 8: should return undefined user with username = xxxxxxx in database', function(done) {
      User.findByUsername('xxxxxxx', function(error, rows){
        assert.equal(rows, undefined)
        done();
      });
    });

    it('Test case 9: should return user id= 1 with role = member after update in database', function(done) {
      User.changeRoleUser(1,'member', function(error,result){
        User.findById(1,function(error,rows){
          assert.equal(rows.role,'member')
          done();
        });
      });
    });


  });
});

describe('Account Management', function(){
   describe('Test case 1: register success', function(){
        it('should return status 200', function(done){
          var account = {
            username: 'test',
            password: '123',
            name: 'test user',
          }
          request(server)
            .post('/auth/signup')
            .set('content-type', 'application/json')
            .send(JSON.stringify(account))
            .expect(302)
            .end(function(err, res) {
                  done();

                });
        });
    });
  });


describe('Book Online', function(){
   describe('Test case 1: get branch', function(){
        it('should return status 200', function(done){
          var branch = {
            phone: '096235667',
          }
          request(server)
            .get('/book/getBranches')
            .expect(200)
            .end(function(err, res) {
                  done();

                });
        });
    })
  });

