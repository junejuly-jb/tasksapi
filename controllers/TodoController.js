const Todo = require('../models/Todo');

const addTodo = async (req, res) => { 
    try {
        const todo = new Todo({
            "owner": req.user,
            "todo": req.body.todo,
            "details": req.body.details,
        });
        await todo.save();
        return res.status(200).json({ "success": true, "message": "Todo added successfully" });
    } catch (e) { 
        return res.status(400).json({
            "success": false,
            "message": e.message
        });
    }
}

const todos = async (req, res) => { 
    try {
        const todos = await Todo.find({ "owner": req.user }).sort([['created_at', 'descending']]);
        return res.status(200).send(todos);
    } catch (e) { 
        return res.status(400).json({
            "success": false,
            "message": e.message
        });
    }
}

const deleteTodo = async (req, res) => { 
    try {
        const result = await Todo.deleteOne({ "_id": req.params.id, "owner": req.user });
        if (result.deletedCount > 0) return res.status(200).json({ "success": true, "message": "Todo deleted successfully" });
        return res.status(400).json({ "success": false, "message": "deletion failed" });
    }
    catch (e) {
        return res.status(400).json({ "success": false, "message": e.message });
    }
}

const markComplete = async (req, res) => {
    try {
        const result = await Todo.updateOne({ "_id": req.params.id, "owner": req.user }, { $set: { "flag": true } });
        if (result.modifiedCount > 0) return res.status(200).json({ "success": true, "message": "Todo marked as complete" });
        return res.status(400).json({ "success": false, "message": "Something went wrong" });
    } catch (e) {
        return res.status(400).json({ "success": false, "message": e.message });
    }
}


const unMarkComplete = async (req, res) => {
    try {
        const result = await Todo.updateOne({ "_id": req.params.id, "owner": req.user }, { $set: { "flag": false } });
        if (result.modifiedCount > 0) return res.status(200).json({ "success": true, "message": "Todo marked as incomplete" });
        return res.status(400).json({ "success": false, "message": "Something went wrong" });
    } catch (e) {
        return res.status(400).json({ "success": false, "message": e.message });
    }
}

module.exports = { addTodo, todos, deleteTodo, markComplete, unMarkComplete };