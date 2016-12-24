var mysql      = require('mysql');
var pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'toor',
  database : 'YACOFFEE'
});

exports.addOrderReceipt = function(post, callback){
  pool.getConnection(function(err, connection) {
    var query = connection.query('INSERT INTO OrderDrink SET ?', post, function(err, result) {
       connection.release();
       callback(result);
     });
    console.log(query.sql);
  });
}

exports.addOrderInfo = function(post, callback){
  pool.getConnection(function(err, connection) {
    var query = connection.query('INSERT INTO ReceiptInfo SET ?', post, function(err, result) {
       connection.release();
       callback(result);
     });
    console.log(query.sql);
  });
}

exports.getListOrderDrink = function(idManager, callback){
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
