var net = require('net'),
	Index = require('ip2something').Index;

var idx = new Index();

var server = net.createServer(function (stream) {
	var tmp = "";
	stream.setEncoding('utf8');
  /*stream.on('connect', function () {
    stream.write('hello\r\n');
  });*/
  stream.on('data', function (chunk) {
		tmp += chunk;
		var lines = tmp.split("\n");
		if(lines.length > 1) {
			tmp = lines.pop();
			lines.forEach(function(line) {
				idx.search(line.split(' ')[0], function(loc) {
					console.log(loc);
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