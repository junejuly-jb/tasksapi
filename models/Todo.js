const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
     owner: { type: Schema.Types.ObjectId, required: true },
     todo: { type: String, required: true },
     details: { type: String, required: false },
     flag: { type: Boolean, required: true, default: false },
}, {timestamps: { createdAt: 'created_at'}})

module.exports = mongoose.model('Todo', todoSchema);