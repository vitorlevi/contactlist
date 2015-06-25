var express = require('express');
var app = require('express')();
var mongojs = require('mongojs');
var db = mongojs('mongodb://dbconnect:123456@ds033750.mongolab.com:33750/mongobase', ['items']);
var bodyParser = require('body-parser');
var http = require('http').Server(app);

app.listen(3000, function(){
  console.log('listening on *:3000');
});

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/items', function (req, res) {
	
	console.log("I received a GET Request");

	db.items.find(function (err, docs) {
		console.log(docs);
		res.json(docs);
	});
});

app.post('/items', function (req, res) {
	
	console.log(req.body);

	db.items.insert(req.body, function (err, doc){
		res.json(doc);
	})
});

app.delete('/items/:id', function (req, res){
	
	var id = req.params.id;

	db.items.remove({_id: mongojs.ObjectId(id)}, function (err, doc){
		res.json(doc);
	});
});

app.get('/items/:id', function (req, res){
	
	var id = req.params.id;

	db.items.findOne({_id: mongojs.ObjectId(id)}, function (err, doc){
		res.json(doc);
	});
});

app.put('/items/:id', function (req, res){
	var id = req.params.id;
	console.log(req.body.name);

	db.items.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {
			name: req.body.name,
			email: req.body.email,
			number: req.body.number
		}},
		new: true}, function (err, doc){
			res.json(doc);
		});
});


