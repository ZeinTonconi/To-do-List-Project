const Category = require("./Category");
const Task = require("./Task");
const Tag = require("./Tag");
const User = require("./User");
const Image = require('./Image');

const database = {
    category: Category,
    task: Task,
    tag: Tag,
    user: User,
    image: Image
}

module.exports = database;