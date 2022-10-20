const Category = require("./Category");
const Task = require("./Task");
const Tag = require("./Tag");

const database = {
    category: Category,
    task: Task,
    tag: Tag,
}

module.exports = database;