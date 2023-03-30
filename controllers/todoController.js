const Todo = require('../models/todo.modal')


exports.AllTodo = async (req, res) => {
    try {

        const userId = req.user.id;
        const todos = await Todo.find({ user: userId })
        res.status(200).json({
            message: "All todos",
            todos
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving todos.",
        });
    }
}


exports.create = async (req, res) => {
    if (!req.body.title || !req.body.description) {
        return res.status(400).json({
            message: "Title & Description can not be empty",
        });
    }
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        user: req.user.id,
    });
    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.findOne = async (req, res) => {

    try {
        const todo = await Todo.find({ _id: req.params.id, user: req.user.id });
        if (!todo) {
            return res.status(404).json({
                message: "Todo not found with id " + req.params.id,
            });
        }
        res.status(200).json({
            message: "Todo found",
            todo
        })


    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving todos.",
        });
    }
}

exports.updateTodo = async (req, res) => {


    try {

        const todo = await Todo.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
        }, { new: true });
        if (!todo) {
            return res.status(404).json({
                message: "Todo not found with id " + req.params.id,
            });
        }
        res.status(200).json({
            message: "Todo updated",
            todo
        })

    }
    catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving todos.",
        });
    }


}

exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!todo) {
            return res.status(404).json({
                message: "Todo not found with id " + req.params.id,
            });
        }
        res.status(200).json({
            message: "Todo deleted",
            todo
        })
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving todos.",
        });
    }
}

