const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const orientDB = require('orientjs');

const server = orientDB({
    host: 'localhost',
    port: 2424,
    username: 'root',
    password: '1234'
});

const db = server.use('o2');

const app = express();
app.locals.pretty = true;

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({
    extended: false
}));

app.set('views', './views');
app.set('view engine', 'jade');



app.get('/topic/add', (req, res) => {

    var selectAllSql = 'SELECT FROM topic';

    db.query(selectAllSql).then((topics) => {
        res.render('add', {
            topics: topics,
        });
    });

});



app.post('/topic/add', (req, res) => {
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;

    var sql = 'INSERT INTO topic (title, description, author) VALUES (:title, :desc, :author)';
    var param = {
        params: {
            title: title,
            desc: description,
            author: author
        }
    };
    db.query(sql, param).then((topics) => {
        res.redirect('/topic/' + encodeURIComponent(topics[0]['@rid']));
    });

});



app.get('/topic/:id/edit', (req, res) => {

    
    var selectAllSql = 'SELECT FROM topic';

    db.query(selectAllSql).then((topics) => {
        var param = {
            params: {
                rid: req.params.id
            }
        };
        var selectSql = 'SELECT FROM topic WHERE @rid = :rid';
        db.query(selectSql, param).then((selectedTopic) => {
            res.render('edit', {
                topics: topics,
                topic: (selectedTopic.length ? selectedTopic[0] : null)
            });
        });
        
    });

});



app.post('/topic/:id/edit', (req, res) => {

    var id = req.params.id;

    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;

    var sql = 'UPDATE topic SET title = :title, description = :desc, author = :author WHERE @rid = :id';
    var param = {
        params: {
            id: id,
            title: title,
            desc: description,
            author: author
        }
    };
    db.query(sql, param).then((count) => {
        res.redirect('/topic/' + encodeURIComponent(id));
    });

});

app.get('/topic/:id/delete', (req, res) => {

    var selectAllSql = 'SELECT FROM topic';
    db.query(selectAllSql).then((topics) => {
        var selectSql = 'SELECT FROM topic WHERE @rid = :rid';
        var param = {
            params: {
                rid: req.params.id
            }
        };
        db.query(selectSql, param).then((selectedTopic) => {
            res.render('delete', {
                topics: topics,
                topic: (selectedTopic.length ? selectedTopic[0] : null)
            });
        });
    });

});

app.post('/topic/:id/delete', (req, res) => {

    var id = req.params.id;

    var sql = 'DELETE FROM topic WHERE @rid = :id';
    var param = {
        params: {
            id: id
        }
    };
    db.query(sql, param).then((count) => {
        res.redirect('/topic');
    });

});



app.get(['/topic', '/topic/:id'], (req, res) => {

    var selectAllSql = 'SELECT FROM topic';

    db.query(selectAllSql).then((topics) => {

        var id = req.params.id;
        if (id) {
            var selectSql = 'SELECT * FROM topic WHERE @rid = :rid';
            var param = {
                params: {
                    rid: id
                }
            };
            db.query(selectSql, param).then((selectedTopic) => {
                res.render('view', {
                    topics: topics,
                    topic: (selectedTopic.length ? selectedTopic[0] : null)
                });
            });
        } else {
            res.render('view', {
                topics: topics,
            });
        }

    });

});

app.listen(3000, () => {
    console.log('connected, 3000 port!');
});