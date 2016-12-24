var mysql      = require('mysql');
var pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'toor',
  database : 'YACOFFEE'
});

exports.findAll = function(callback){
  pool.getConnection(function(err, connection) {
    var query = connection.query( "SELECT * FROM Products", function(err, rows) {
       connection.release();
       callback(null,rows);
     });
    console.log(query.sql);
  });
}

exports.chooseProduct = function(id, callback){
  pool.getConnection(function(err, connection) {
    var query = connection.query("SELECT * FROM Product WHERE id = '" + id + "'", function(err, result) {
       connection.release();
       callback(result);
     });
    console.log(query.sql);
  });
}

exports.addProduct = function(post, callback){
  pool.getConnection(function(err, connection) {
    var query = connection.query('INSERT INTO Product SET ?', post, function(err, result) {
       connection.release();
       callback(result);
     });
    console.log(query.sql);
  });
}
