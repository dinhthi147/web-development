var mysql      = require('mysql');
var pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'toor',
  database : 'YACOFFEE'
});

var user = null;

exports.findByUsername = function(userName, callback){
  pool.getConnection(function(err, connection) {
    var query = connection.query( "SELECT * FROM Users WHERE username = '" + userName + "'", function(err, rows) {
       connection.release();
       callback(null,rows[0]);
     });
    console.log(query.sql);
  });
}

exports.changeRoleUser = function(idUser, role, callback){
  pool.getConnection(function(err, connection) {
    var query = connection.query( "UPDATE Users SET role = '" + role +"' WHERE id = '" + idUser + "'", function(err, result) {
       connection.release();
       callback(null,result);
     });
    console.log(query.sql);
  });
}

exports.updateUserInfo = function(idUser, post, callback){
  pool.getConnection(function(err, connection) {
    var query = connection.query( "UPDATE Users SET ? WHERE id = '" + idUser + "'", post, function(err, result) {
       connection.release();
       callback(null,result);
     });
    console.log(query.sql);
  });
}

exports.findByFacebookID = function(idFacebook, callback){
  pool.getConnection(function(err, connection) {
    var query = connection.query( "SELECT * FROM Users WHERE idFacebook = '" + idFacebook + "'", function(err, rows) {
       connection.release();
       callback(null,rows[0]);
     });
    console.log(query.sql);
  });
}

exports.findByGoogleID = function(idGoogle, callback){
  pool.getConnection(function(err, connection) {
    var query = connection.query( "SELECT * FROM Users WHERE idGoogle = '" + idGoogle + "'", function(err, rows) {
       connection.release();
       callback(null,rows[0]);
     });
    console.log(query.sql);
  });
}

exports.findById = function(id, callback){
  pool.getConnection(function(err, connection) {
    var query = connection.query( "SELECT * FROM Users WHERE id = '" + id + "'", function(err, rows) {
       connection.release();
       callback(null,rows[0]);
     });
    console.log(query.sql);
  });
}

exports.addUser = function(post , callback){
  pool.getConnection(function(err, connection) {
    var query = connection.query('INSERT INTO Users SET ?', post, function(err, result) {
       connection.release();
       console.log(result)
       callback(result);
     });
    console.log(query.sql);
  });
}
