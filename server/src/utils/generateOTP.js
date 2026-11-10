import crypto from 'node:crypto'
import bcrypt from 'bcrypt'

/**
 * Generates a cryptographically secure 6-digit numeric OTP.
 * @returns {string} 6-digit OTP (e.g. "482910")
 */
export const generateNumericOTP = () => {
  return crypto.randomInt(100000, 1000000).toString()
}

/**
 * Hashes an OTP string using bcrypt with salt rounds 10.
 * @param {string} otp
 * @returns {Promise<string>}
 */
export const hashOTP = async (otp) => {
  return bcrypt.hash(otp, 10)
}

/**
 * Verifies a candidate plain OTP against its stored hash.
 * @param {string} candidateOtp
 * @param {string} hashedOtp
 * @returns {Promise<boolean>}
 */
export const verifyOTPHash = async (candidateOtp, hashedOtp) => {
  if (!candidateOtp || !hashedOtp) return false
  return bcrypt.compare(candidateOtp, hashedOtp)
}
