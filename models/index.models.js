const Category = require("./Category");
const Task = require("./Task");
const Tag = require("./Tag");
const User = require("./User");
const Image = require('./Image');

const database = {
    Category,
    Task,
    Tag,
    User,
    Image
}

module.exports = database;