var mysql      = require('mysql');
var pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'toor',
  database : 'YACOFFEE'
});

exports.findById = function(id, callback){
  pool.getConnection(function(err, connection) {
    var query = connection.query( "SELECT * FROM Branches WHERE id = '" + id + "'", function(err, rows) {
       connection.release();
       callback(null,rows);
     });
    console.log(query.sql);
  });
}

exports.getAllBranch = function(callback){
  pool.getConnection(function(err, connection) {
    var query = connection.query( "SELECT * FROM Branches", function(err, rows) {
       connection.release();
       callback(null,rows);
     });
    console.log(query.sql);
  });
}

exports.getTablesAtBranch = function(idBranch, callback){
  pool.getConnection(function(err, connection) {
    var query = connection.query( "SELECT * FROM Tables WHERE Tables.idBranch = '" + idBranch + "'", function(err, rows) {
       connection.release();
       callback(null,rows);
     });
    console.log(query.sql);
  });
}

exports.bookTableAtBranch = function(post, callback){
  pool.getConnection(function(err, connection) {
    var query = connection.query('INSERT INTO OrderTable SET ?', post, function(err, result) {
       connection.release();
       callback(null,result);
     });
    console.log(query.sql);
  });
}

exports.getListBookTable = function(idManager, callback){
  pool.getConnection(function(err, connection) {
    var query = connection.query( "SELECT * FROM OrderTable WHERE idTable IN \
                                   (SELECT idTable FROM Tables WHERE idBranch = \
                                   (SELECT idBranch FROM Branches WHERE idManager = " + idManager + "));", function(err, rows) {
      connection.release();
      callback(null,rows);
    });
    console.log(query.sql);
  });
}
