import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const refreshTokenSessionSchema = new mongoose.Schema(
  {
    tokenHash: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
    userAgent: { type: String, default: 'Unknown' },
    ip: { type: String, default: 'Unknown' },
  },
  { _id: true }
)

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: function () {
        // passwordHash is required only if googleId is not present
        return !this.googleId
      },
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },
    role: {
      type: String,
      enum: ['buyer', 'broker', 'admin'],
      default: 'buyer',
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    company: {
      type: String,
      trim: true,
      default: '',
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isTwoFactorEnabled: {
      type: Boolean,
      default: true, // Email OTP required by default per requirements
    },
    twoFactorMethod: {
      type: String,
      enum: ['email', 'authenticator'],
      default: 'email',
    },
    refreshTokens: [refreshTokenSessionSchema],
    resetPasswordTokenHash: {
      type: String,
      default: null,
    },
    resetPasswordExpires: {
      type: Date,
      default: null,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.passwordHash
        delete ret.refreshTokens
        delete ret.resetPasswordTokenHash
        delete ret.resetPasswordExpires
        delete ret.__v
        return ret
      },
    },
  }
)

// Instance method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.passwordHash) return false
  return bcrypt.compare(candidatePassword, this.passwordHash)
}

// Instance method to serialize safe public user
userSchema.methods.toSafeObject = function () {
  return {
    id: this._id.toString(),
    _id: this._id.toString(),
    name: this.name,
    email: this.email,
    role: this.role,
    phone: this.phone || '',
    company: this.company || '',
    isEmailVerified: this.isEmailVerified,
    isTwoFactorEnabled: this.isTwoFactorEnabled,
    twoFactorMethod: this.twoFactorMethod,
    googleLinked: Boolean(this.googleId),
    favorites: this.favorites || [],
    createdAt: this.createdAt,
  }
}

const User = mongoose.model('User', userSchema)
export default User
