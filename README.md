# Morningscore-Challenge
 
This project was made as an interview challenge for a job application at morningscore.io.
It is in essence a simple node module that parses a csv file into javascript objects in an array, that can then be further processed.
Below is a shot description of the methods in the module.

## Using the module
```js
const parser = require('csv-parser')
```

## Methods
### Read File
This method read the file and splits up the different lines to be used for the objects. The first line is defined as the keys for the objects and all other lines are used as values.
```js
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
```
### Create Object
This method is used to generate the javascript object by assigning the values to the keys and returning the object.
```js
createobject(keys, values) {
    var object = { };
    for(var i = 0; i < keys.length; i++) {
        object[keys[i]] = values[i];
    }
    return object;
}
```
### Parse File
This method serves as the encompassing method that takes the required parameters and returns an array of the objects created from the csv. Before any other methods are called, the method ensures that the filepath contains the .csv file extension.
```js
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
```
