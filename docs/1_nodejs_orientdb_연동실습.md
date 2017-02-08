# nodejs + database

## Relational Database

- Oracle
- MySQL
- SQL Server

## NoSQL

관계형 데이터베이스가 아닌 것...


## [OrientDB](http://orientdb.com/)

- NoSQL
- 우수한 성능
- 독특한 특성
- Java로 개발


### [Orient DB 특징](http://orientdb.com/multi-model_database/)

- Graph Database (관계성을 처리할 수 있다)
- Document Database (NoSQL특성.. 관계형DB처럼 표가 아닌 하나의 문서를 저장한다는 특성, 정보를 유연하게 저장하고 가져올 수 있다.)
- Object-Oriented Concepts (테이블 대신 Class라는 표현을 사용. 상속도 가능?? 유사한 테이블이 많이 생기는 구조에서 유용)
- Schema-full, Schema-less, Schema mix
- User and Role Security (사용자 인증체계)
- Record Level Security (관계형처럼 테이블 단위가 아닌 행 단위로 인증체계 가짐, 즉 글을 쓴 사람만 접근할수 있는 형태)
- NoSQL이지만 SQL문법을 제공
- ACID Transaction (트랜잭션 기능 제공)
- Multi-Master Replication (쓰기(변경)기능은 분산하기가 어렵다. 그러나 OrientDB는 여러대에 쓰기기능을 분산할수 있다.)
- Native HTTP Rest/JSON

### Orient DB 설치방법
- JDK 설치
- Orient DB Binary 다운로드
- /bin 폴더 내 server.bat 실행 (최초 관리자 비밀번호 설정)
- http://localhost:2480 (gui 관리자툴)


### Orient DB 개념
- Schema
- General Class : Table
- Properties : Column (필수는 아니다.. 엄격하게 쓰려면 설정해야 한다)


### Nodejs + OrientDB 연동 실습
- 서버 실행 (server.bat)
- npm에서 nodejs용 orientDB 드라이버 받기 [link](https://www.npmjs.com/package/orientjs)
- 서버 접속 구문 코딩 [Server API](http://orientdb.com/docs/last/OrientJS-Server.html)
~~~
// load orientDB module
var OrientDB = require('orientjs');

// connect db server (server API)
var server = OrientDB({
    host: 'localhost',
    port: 2424,
    username: 'root',
    password: '1234'
});
~~~

- DB 접속 구문 코딩 [Database API](http://orientdb.com/docs/last/OrientJS-Database.html)
~~~
// use db (database API)
var db = server.use('o2');
console.log('Using Database:'  + db.name);
~~~

- Record (Row) 가져오기 [Record API](http://orientdb.com/docs/last/OrientJS-Record.html)
~~~
var rec = db.record.get('#33:0').then((record) => {
    console.log('Loaded Record:', record);
});
~~~

- SQL Query 사용하기 [Query API](http://orientdb.com/docs/last/OrientJS-Query.html)
~~~
var sql = 'SELECT * FROM topic WHERE @rid=:rid';
var param = {
	params: {
		rid: '#34:0'	
	}	
};
db.query(sql, param).then((results) => {
	console.log(results);
});
~~~
