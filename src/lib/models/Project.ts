const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  developers: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      role: {
        type: String,
        enum: ['admin', 'developer', 'viewer'],
        default: 'developer',
      },
    },
  ],
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
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

const Project =
  mongoose.models.Project || mongoose.model('Project', ProjectSchema);

export default Project;
