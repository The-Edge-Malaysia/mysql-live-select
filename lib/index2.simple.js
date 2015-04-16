"use strict";

var util = require("util");
var LivePG = require("./LivePG");

var CONN_STR = "postgres://meteor:meteor@127.0.0.1/meteor";
var CHANNEL = "ben_test";

var liveDb = new LivePG(CONN_STR, CHANNEL);

liveDb.on("error", function (err) {
	return console.error(err.stack);
});

liveDb.select("\n\tSELECT\n\t\t*\n\tFROM\n\t\tscores\n\tORDER BY\n\t\tscore DESC\n").on("update", function (diff, rows) {
	console.log(util.inspect(diff, { depth: null }), rows);
});

// Ctrl+C
process.on("SIGINT", function () {
	liveDb.cleanup().then(process.exit);
});