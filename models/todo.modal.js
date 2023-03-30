const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'pending',
    }
}, { timestamps: true });


const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
