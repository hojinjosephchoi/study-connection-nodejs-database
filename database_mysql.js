const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'o2'
});

conn.connect();


// CRUD with SQL statement
// select
var sql = 'SELECT * FROM topic';
conn.query(sql, (err, rows, fields) => {
	if(err){
		console.log(err);
	}else{
		for(var inx = 0, len = rows.length; inx < len; inx++){
			console.log(rows[inx].description);
		}
	}
});

// select with where
// var sql = 'SELECT * FROM topic WHERE id = ?';
// var params = [3];
// conn.query(sql, params, (err, rows, fields) => {
// 	if(err){
// 		console.log(err);
// 	}else{
// 		for(var inx = 0, len = rows.length; inx < len; inx++){
// 			console.log(rows[inx].description);
// 		}
// 	}
// });

// // insert
// var sql = 'INSERT INTO topic(title, description, author) VALUES(?, ?, ?)';
// var params = ['Express', 'Express is framework for web', 'Choi'];
// conn.query(sql, params, (err, rows, fields) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(rows.insertId);
//     }

// });

// // update
// var sql = 'UPDATE topic SET title = ?, description = ?, author = ? WHERE id = ?';
// var params = ['Expressjs', 'Web framework for nodejs', 'lattekafe', 3];
// conn.query(sql, params, (err, rows, fields) => {
// 	if (err) {
// 	    console.log(err);
// 	} else {
// 	    console.log(rows);
// 	}
// });

// // delete
// var sql = 'DELETE FROM topic WHERE id = ?';
// var params = [1];
// conn.query(sql, params, (err, rows, fields) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(rows);
//     }
// });

conn.end();