const CsvParser = require('../csv-parser')

var parser = new CsvParser();

var start = Date.now();

var list = parser.parsefile('./FL_insurance_sample.csv', ',');

var end = Date.now();
var time = end-start;

console.log(list.length);
console.log(list[0]);
console.log("time:"+time);