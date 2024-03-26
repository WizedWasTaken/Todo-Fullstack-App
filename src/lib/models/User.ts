import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  image: { type: String },
  password: { type: String },
  group: {
    type: [String],
    default: 'free',
    enum: ['free', 'pro', 'enterprise', 'admin', 'allPerms', 'friend'],
  },
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Project',
    },
  ],
  provider: { type: String },
  providerId: { type: String },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
