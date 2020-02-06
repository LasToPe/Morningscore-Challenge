/**
 * author: Lasse Pedersen
 * date: 05/02-20
 */

'use strict'
const fs = require('fs');

class CsvParser {
    constructor() { }
    /**
     * method for reading the file and splitting it up into the keys and values
     * @param {path to the csv file} path 
     * @param {delimiter of the csv} delimiter 
     */
    readfile(path, delimiter) {
        //read all the content of the file
        var content = fs.readFileSync(path, 'utf8');

        //split the entirety of the file into the different lines with regex
        var lines = content.match(/^.*/gm);

        //the keys are always stored in the first line of the csv
        var keys = lines[0].split(delimiter);
        var values = [];
        for(var i = 1; i < lines.length; i++) {
            //ensure no empty elements
            if(lines[i].length > 0) {
                values.push(lines[i].split(delimiter));
            }
        }
        return { keys, values };
    }

    /**
     * method for turning the values from the csv into javascript objects
     * @param {the property names for the object} keys 
     * @param {the value arrays for the objects} values 
     */
    createobject(keys, values) {
        var object = { };
        for(var i = 0; i < keys.length; i++) {
            object[keys[i]] = values[i];
        }
        return object;
    }

    /**
     * master method for performing a csv parse
     * @param {path to the csv file} path 
     * @param {delimiter of the csv} delimiter 
     */
    parsefile(path, delimiter) {
        //check file extension
        if(!path.match(/\.csv/)) {
            throw "File is not a csv, it will not work.";
        }

        //get the lines from the readfile method as a keys array and values arrays
        var lines = this.readfile(path, delimiter);

        //create an empty array/list to store all object generated from the csv
        var list = []
        for(var i = 0; i < lines.values.length; i++) {
            var object = this.createobject(lines.keys, lines.values[i]);
            list.push(object);
        }
        return list;
    }
}

module.exports = CsvParser;