Node log
========

It needs the node library of ip2something.

Try it
------

In a first terminal

	node server.js

In an other terminal

	tail -f /var/log/lighttpd/access.log | nc localhost 8124