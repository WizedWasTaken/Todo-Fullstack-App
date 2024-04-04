import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
  developer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    enum: ['open', 'inProgress', 'completed'],
    default: 'open',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium',
  },
  dueDate: { type: Date, default: Date.now },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      text: { type: String },
      date: { type: Date, default: Date.now },
    },
  ],
});

const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);

export default Task;
