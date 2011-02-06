var net = require('net'),
	Index = require('ip2something').Index,
	http = require('http'),
	io = require('socket.io'),
	fs = require('fs'),
	url = require('url');

var idx = new Index();

var web = http.createServer(function(req, res){ 
	var path = url.parse(req.url).pathname;
	switch (path) {
	case '/':
		res.writeHead(200, {'Content-Type': 'text/html'}); 
		res.write(fs.readFileSync('index.html')); 
		res.end(); 
	case '/map.jpg':
		res.writeHead(200, {'Content-Type': 'image/jpeg'});
                res.write(fs.readFileSync('map.jpg'));
                res.end();
	case '/cross.png':
                res.writeHead(200, {'Content-Type': 'image/png'});
                res.write(fs.readFileSync('cross.png'));
                res.end();
	break;
	
}
 // your normal server code 
});
web.listen(8000);

// socket.io 
var ws = io.listen(web); 
ws.on('connection', function(client){
	//console.log(client);
	//client.broadcast({ announcement: client.sessionId + ' connected' });
	// new client is here! 
	client.on('message', function(){
		
	});
	client.on('disconnect', function(){
		
	});
});

var server = net.createServer(function (stream) {
	var tmp = "";
	stream.setEncoding('utf8');
	stream.on('connect', function () {
		//stream.write('hello\r\n');
		console.log("connection to log server");
	});
	stream.on('data', function (chunk) {
		//console.log(chunk);
		tmp += chunk;
		var lines = tmp.split("\n");
		if(lines.length > 1) {
			tmp = lines.pop();
			lines.forEach(function(line) {
				idx.search(line.split(' ')[0], function(loc) {
					console.log(loc);
					if(loc.substr(0,2) != "RD") {
						ws.broadcast(loc);
					}
				});
			});
		}
  });
  stream.on('end', function () {
    //stream.write('goodbye\r\n');
    stream.end();
  });
});
server.listen(8124);
