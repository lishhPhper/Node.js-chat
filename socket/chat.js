

var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(8080);

function handler (req, res) {
	//当浏览器<script src='./jquery.js'></script>请求发起,服务器将jquery发送给浏览器,
	//浏览器才可以拿到jquery
	// console.log(req.url);
	if(req.url == '/jquery.js'){
		fs.readFile('./view/jquery.js',function (err, jq) {

			if(err) throw err;

			res.writeHead(200);
			res.end(jq);
		});
	}
	if(req.url == '/layer.js') {
		fs.readFile('./view/layer.js',function (err, data) {
			if(err) throw err;
			res.writeHead(200);
			res.end(data);
		});
	}
	if (req.url == '/layer.css'){
		fs.readFile('./view/layer.css',function (err, jq) {

			if(err) throw err;

			res.writeHead(200);
			res.end(jq);
		});
	}

	fs.readFile(__dirname + '/view/index.html', function (err, data) {
	if (err) {
	  res.writeHead(500);
	  return res.end('Error loading index.html');
	}
	res.writeHead(200);
	res.end(data);
	});
}


io.on('connection', function (socket) {
	socket.on( 'chat', function( data ){
			// console.log(data);
		// 将数据发送给所有人
		io.sockets.emit( 'msg', { name: data.name, chat:data.my } );
	} );
	socket.on( 'join', function(data){
		io.sockets.emit( 'join', { joinchat: data.name + ' 加入聊天室!'  } );
	} );
});
