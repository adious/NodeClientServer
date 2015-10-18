console.log("Handling client request");

//change port number and update client ports too when error port in use
const PORT = 8093;

var http = require('http');
var connect = require('connect');
var logger = require('morgan'); //for logging
var bodyParser = require("body-parser"); // for parsing data


//setting up connect middleware
var app = connect()
.use(logger('dev'))
.use(bodyParser.urlencoded({extended:false}));



app.use(function middleware1(req, res, next) {
  // middleware 1
  console.log('middleware1');
  next();
});
app.use(function middleware2(req, res, next) {
  // middleware 2
  console.log('middleware2');
  next();
});

app.use('/foo', function fooMiddleware(req, res, next) {
  // req.url starts with "/foo"
    console.log('foo');
  next();
});
app.use('/bar', function barMiddleware(req, res, next) {
  // req.url starts with "/bar"
    console.log('bar');
  next();
});


app.use('/form', function form(req, res) {
  // req.url starts with "/form"
		var parsedInfo={};
		parsedInfo.firstName = req.body.userFirstName;
		parsedInfo.lastName = req.body.userLastName;
		console.log(parsedInfo.firstName +" " +parsedInfo.lastName);
		res.end('Data received',200); // when end called req will not go on next step
});

app.use(function onerror(err, req, res, next) {
  // an error occurred!
    console.log(err);
});

// respond to all requests
app.use(function(req, res){
  res.end('Hello from Connect!\n');
})

var server = http.createServer(app)
.listen(PORT,function(){
	console.log('server is listening http://localhost:'+PORT);
});
