# nodejs + MySQL 웹앱제작

## MySQL

- 오픈소스
- AMP (Apache + MySQL + PHP)
- MySQL > Sun Microsystems > Oracle

## MySQL 호환 DB
- MariaDB (MySQL 창시자가 Oracle의 정책에 반발해 퇴사후 만든 DB), MySQL과 호환
- Amazon Aurora (AWS의 MySQL 호환제품)


## MySQL 구조
- table : 단일 주제에 관해 행과 열로 구성되는 정보 모음
- database : 테이블의 집합, 일반적으로 1개의 database - 1개의 application에 대응
- database server : db(schema)의 집합. (localhost:3306)


## 명령어
- 서버 접속
~~~
$ mysql -u root -p xxxx
~~~

- DB 생성
~~~
CREATE DATABASE o2 CHARACTER SET utf8_general_ci;
~~~

- DB 목록 조회
~~~
SHOW DATABASES;
~~~

- DB(Schema) 사용명령
~~~
USE o2;
~~~

- Table 생성
~~~
CREATE TABLE `o2`.`topic` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  `author` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
~~~

- TABLE 목록조회
~~~
SHOW TABLES;
~~~

- Insert구문
~~~
INSERT INTO topic
(title,
description,
author)
VALUES
('Javascript',
'Computer language for web',
'Joseph');
~~~

- Select구문
~~~
SELECT * FROM topic;
SELECT * FROM topic WHERE id = 2;
~~~

- Update 구문
~~~
UPDATE topic
SET
title = 'NPM'
WHERE id = 2;
~~~

- Delete 구문
~~~
DELETE FROM topic
WHERE id = 2;
~~~

---

## Node + MySQL 연동

### [node용 mysql 플러그인](https://www.npmjs.com/package/mysql)

~~~
$ npm install mysql
~~~

### nodejs + mysql 테스트 코드
~~~
const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'o2'
});

conn.connect();

conn.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});
~~~ 


---

[MySQL Character set](http://blog.chakannom.com/2015/12/mysql-utf8generalci-utf8unicodeci.html)

[MySQL Table Engine비교](http://mysqldba.tistory.com/9)