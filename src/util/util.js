"use strict";

const fs = require("fs");
const path = require("path");

/* Various utility functions. */

/**
 * Recursively read all files in a directory.
 * @param {fs.PathLike} dirPath The path to the directory that will be recursively traversed. 
 * @param {Array} arrayOfFiles The array that all files will be recursively pushed to.
 * @returns Returns an array of files.
 */
module.exports.getAllFiles = function getAllFiles(dirPath, arrayOfFiles)
{
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function (file)
    {
        if (fs.statSync(dirPath + "/" + file).isDirectory())
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        else arrayOfFiles.push(path.join(dirPath, "/", file));
    });

    return arrayOfFiles;
};

/**
 * Get the key for the given value in an object.
 * @param {Object} object 
 * @param {any} value 
 * @returns Returns the key that corresponds to the value.
 */
module.exports.getKeyByValue = function (object, value)
{
    return Object.keys(object).find(key => object[key] === value);
};

/**
 * Formats milliseconds to minutes and seconds. 298999 -> 4:59
 * @param {Number} ms The amount of milliseconds.
 * @returns Returns the formatted string.
 */
module.exports.msToMinAndSec = function (ms)
{
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

