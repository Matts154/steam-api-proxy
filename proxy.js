// Proof of concept code from https://blog.javascripting.com/2015/01/17/dont-hassle-with-cors/
var express = require('express');
var request = require('request');

var app = express();

app.use(function(req, res, next) {
	console.log("Incoming request:", req.url);
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use('/', function(req, res) {
	var host = "http://api.steampowered.com"
	var url = host + req.url + "&key=" + process.env.APIKEY;
	req.pipe(request(url)).pipe(res);
});

app.listen(process.env.PORT || 8080);
