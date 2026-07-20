import mongoose from 'mongoose'

const savedSearchSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    filters: { type: mongoose.Schema.Types.Mixed, default: {} },
    alertFrequency: { type: String, enum: ['daily', 'weekly', 'monthly'], default: 'daily' },
    lastNotifiedAt: { type: Date }
  },
  { timestamps: true }
)

const SavedSearch = mongoose.model('SavedSearch', savedSearchSchema)
export default SavedSearch
