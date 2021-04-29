var tr = require('tor-request');
const { base64encode, base64decode } = require('nodejs-base64');
const cheerio = require('cheerio');
tr.setTorAddress("127.0.0.1", "9050");
const express = require("express");
const app = express();
const requestu = require('request');


app.use(express.static(__dirname + '/use'))
app.get("/", function(request, response){
	response.sendfile("use/index.html");
});
app.get("/requests", function(request, response){
	//response.type('text/plain');
	const decoded = base64decode(request.query.url);
	console.log(decoded);
	tr.request(decoded, function (err, res, body) {
		if (!err && res.statusCode == 200) {
			const $ = cheerio.load(body);
			$("script").remove();
			$.html();
			response.send($.html());
		}
	});
});
app.listen(3000);