"use strict";

const { connect, Mongoose } = require("mongoose");
const { cyan, red, green } = require("colors/safe");

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

console.log(cyan("Connecting to Database . . ."));
connect("mongodb+srv://Koni:KoniKlaraManu22@cluster0.7losc.mongodb.net/ElectraBot?authSource=admin&replicaSet=atlas-5d6uzz-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true").then(() =>
{
    console.log(green("Successfully connected to database."));
}).catch((err) => console.error(red(err)));
