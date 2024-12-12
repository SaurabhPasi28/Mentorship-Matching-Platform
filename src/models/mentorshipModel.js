import mongoose from 'mongoose';

const MentorshipRequestSchema = new mongoose.Schema({
  menteeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  message: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

const MentorshipRequest =
  mongoose.models.MentorshipRequest ||
  mongoose.model('MentorshipRequest', MentorshipRequestSchema);
export default MentorshipRequest;
