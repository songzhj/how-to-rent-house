const http = require("http");
const fs = require("fs");

const URL = "http://www.ziroom.com/z/nl/z2.html?qwd=&p=";

function fetchPage(url) {
	httpRequest(url);
}

function httpRequest(url) {
	http.get(url, function(res) {
		var page = "";
		res.setEncoding("utf-8");
		res.on("data", function(chunk) {
			page += chunk;
		});
		res.on("end", function() {
			var house = page.match(/<ul id="houseList">([.\s\S]*)<\/ul>\s*<div class="pages"/g);
			console.log(house);
		})
	});
}

fetchPage(URL + 2);