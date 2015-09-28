'use strict';

var app = require('express')();
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://' + (process.env.MONGO_SERVICE_HOST || 'localhost') + ':27017/foo';

app.get('/database', function(req, res) {
	MongoClient.connect(url, function(err, db) {
		console.log("Connected correctly to server", err);
		var collection = db.collection('documents');
		collection.insert([
			{a : 1}, {a : 2}, {a : 3}
		], function(err, result) {
			console.log("Inserted 3 documents into the document collection");
			console.log(err, result);
			collection.find({}).toArray(function(err, docs) {
				res.json(docs);
				db.close();
			});
		});
	});
});
app.get('/', function(req, res) {
	res.json(process.env);
});

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
app.listen(port);
