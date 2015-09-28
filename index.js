'use strict';

var app = require('express')();

app.get('/', function(req, res) {
	res.json(process.env);
});

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
app.listen(port);
