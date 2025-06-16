import mongoose, { Document, Schema } from 'mongoose';

interface ITodo extends Document {
    title: string;
    completed: boolean;
}

const todoSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Todo = mongoose.model<ITodo>('Todo', todoSchema);

export default Todo;