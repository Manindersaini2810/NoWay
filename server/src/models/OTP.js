import mongoose from 'mongoose'

const otpSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    otpHash: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      enum: ['email_verification', '2fa_login', 'password_reset', 'google_2fa'],
      required: true,
    },
    attempts: {
      type: Number,
      default: 0,
      max: 5,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }, // MongoDB TTL auto-cleanup
    },
    lastSentAt: {
      type: Date,
      default: Date.now,
    },
    consumed: {
      type: Boolean,
      default: false,
    },
    tempToken: {
      type: String,
      sparse: true,
      index: true,
    },
  },
  { timestamps: true }
)

const OTP = mongoose.model('OTP', otpSchema)
export default OTP
