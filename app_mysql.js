const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'o2'
});

conn.connect();

const app = express();
app.locals.pretty = true;

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({
    extended: false
}));

app.set('views', './views_mysql');
app.set('view engine', 'jade');



app.get('/topic/add', (req, res) => {

    var sql = 'SELECT * FROM topic';
    conn.query(sql, (err, rows, fields) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            res.render('add', {
                topics: rows,
            });
        }
        
    });

});


app.post('/topic/add', (req, res) => {
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;

    var sql = 'INSERT INTO topic (title, description, author) VALUES (?, ?, ?)';
    var params = [title, description, author];
    conn.query(sql, params, (err, results, fields) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/topic/' + results.insertId);
        }

    });

});



app.get('/topic/:id/edit', (req, res) => {

    
    var selectAllSql = 'SELECT * FROM topic';
    conn.query(selectAllSql, (err, rows, fields) => {

        var selectSql = 'SELECT * FROM topic WHERE id = ?';
        var params = [req.params.id];

        conn.query(selectSql, params, (err, selectedRow, fields) => {
            res.render('edit', {
                topics: rows,
                topic: (selectedRow && selectedRow.length ? selectedRow[0] : null)
            });
        });

    });

});



app.post('/topic/:id/edit', (req, res) => {

    var id = req.params.id;

    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;

    var sql = 'UPDATE topic SET title = ?, description = ?, author = ? WHERE id = ?';
    var params = [title, description, author, id];
    conn.query(sql, params, (err, rows, fields) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/topic/' + id);
        }
    });

});

app.get('/topic/:id/delete', (req, res) => {

    var selectAllSql = 'SELECT * FROM topic';
    conn.query(selectAllSql, (err, rows, fields) => {

        var selectSql = 'SELECT * FROM topic WHERE id = ?';
        var params = [req.params.id];

        conn.query(selectSql, params, (err, selectedRow, fields) => {
            res.render('delete', {
                topics: rows,
                topic: (selectedRow && selectedRow.length ? selectedRow[0] : null)
            });
        });

    });

});

app.post('/topic/:id/delete', (req, res) => {

    var sql = 'DELETE FROM topic WHERE id = ?';
    var params = [req.params.id];
    conn.query(sql, params, (err, results, fields) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/topic');
        }
    });

});



app.get(['/topic', '/topic/:id'], (req, res) => {

    var selectAllSql = 'SELECT * FROM topic';
    conn.query(selectAllSql, (err, rows, fields) => {
        var id = req.params.id;
        if (id) {
            var selectSql = 'SELECT * FROM topic WHERE id = ?';
            var params = [id];

            conn.query(selectSql, params, (err, selectedRow, fields) => {
                res.render('view', {
                    topics: rows,
                    topic: (selectedRow && selectedRow.length ? selectedRow[0] : null)
                });
            });
        } else {
            res.render('view', {
                topics: rows,
            });
        }

    });
    

});

app.listen(3000, () => {
    console.log('connected, 3000 port!');
});