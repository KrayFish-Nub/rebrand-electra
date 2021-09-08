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
}
