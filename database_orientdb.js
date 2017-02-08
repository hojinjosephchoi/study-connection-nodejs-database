// load orientDB module
var OrientDB = require('orientjs');

// connect db server (server API)
var server = OrientDB({
    host: 'localhost',
    port: 2424,
    username: 'root',
    password: '1234'
});

// use db (database API)
var db = server.use('o2');
console.log('Using Database:'  + db.name);

// // load record (record API)
// var rec = db.record.get('#33:0').then((record) => {
//     console.log('Loaded Record:', record);
// });

// CRUD with SQL statement
// select
var sql = 'SELECT * FROM topic';
db.query(sql).then((results) => {
	console.log(results);
});

// // select with where
// var sql = 'SELECT * FROM topic WHERE @rid=:rid';
// var param = {
// 	params: {
// 		rid: '#34:0'	
// 	}	
// };
// db.query(sql, param).then((results) => {
// 	console.log(results);
// });

// // insert
// var sql = 'INSERT INTO topic(title, description) VALUES(:title, :desc)';
// var param = {
// 	params: {
// 		title: 'Express',
// 		desc: 'Express is framework for web'
// 	}
// };
// db.query(sql, param).then((results) => {
// 	console.log(results);
// });

// // update
// var sql = 'UPDATE topic SET title=:title WHERE @rid=:rid';
// var param = {
// 	params: {
// 		title: 'Expressjs',
// 		rid: '#35:0'
// 	}
// };
// db.query(sql, param).then((results) => {
// 	console.log(results);
// });

// // delete
// var sql = 'DELETE FROM topic WHERE @rid=:rid';
// var param = {
// 	params: {
// 		rid: '#35:0'
// 	}
// };
// db.query(sql, param).then((results) => {
// 	console.log(results);
// });