import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
  developers: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      commits: { type: Number, default: 0 },
    },
  ],
  status: {
    type: String,
    enum: ['Åben', 'I gang', 'Færdig', 'Lukket', 'Afventer', 'Annulleret'],
    default: 'Åben',
  },
  priority: {
    type: String,
    enum: ['Lav', 'Mellem', 'Høj', 'Kritisk'],
    default: 'Mellem',
  },
  files: [
    {
      name: { type: String },
      url: { type: String },
    },
  ],
  startDate: { type: Date, default: Date.now },
  dueDate: { type: Date },
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
  created: {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    date: { type: Date, default: Date.now },
  },
  updated: {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    date: { type: Date, default: Date.now },
  },
});

const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);

export default Task;
