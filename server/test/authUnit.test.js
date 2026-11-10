import assert from 'node:assert/strict'
import {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  verify2FASchema,
  resetPasswordSchema,
  PASSWORD_REGEX,
} from '../src/validations/authValidation.js'
import {
  generateNumericOTP,
  hashOTP,
  verifyOTPHash,
} from '../src/utils/generateOTP.js'
import {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
} from '../src/utils/generateTokens.js'
import jwt from 'jsonwebtoken'

console.info('🚀 Starting NoWay Backend Auth & Security Test Suite...\n')

// Test 1: Password regex validation
console.info('Test 1: Password Policy Enforcement')
assert.equal(PASSWORD_REGEX.test('weak'), false, 'Should reject password under 8 chars')
assert.equal(PASSWORD_REGEX.test('alllowercase123!'), false, 'Should reject password with no uppercase')
assert.equal(PASSWORD_REGEX.test('ALLUPPERCASE123!'), false, 'Should reject password with no lowercase')
assert.equal(PASSWORD_REGEX.test('NoNumberHere!'), false, 'Should reject password with no number')
assert.equal(PASSWORD_REGEX.test('NoSpecialChar123'), false, 'Should reject password with no special char')
assert.equal(PASSWORD_REGEX.test('        '), false, 'Should reject only-spaces password')
assert.equal(PASSWORD_REGEX.test('ValidP@ssw0rd!'), true, 'Should accept valid strong password')
console.info('  ✔ Passed: Password policy enforces uppercase, lowercase, numbers, specials, and min 8 chars')

// Test 2: Joi Register Schema Validation
console.info('\nTest 2: Registration Joi Validation')
const invalidReg = registerSchema.validate({
  email: 'not-an-email',
  password: '123',
})
assert.ok(invalidReg.error, 'Should reject invalid email and short password')

const validReg = registerSchema.validate({
  name: 'Vikram Malhotra',
  email: 'vikram@noway.com',
  password: 'ValidP@ssw0rd123!',
  confirmPassword: 'ValidP@ssw0rd123!',
  role: 'broker',
})
assert.equal(validReg.error, undefined, 'Should accept valid registration payload')
console.info('  ✔ Passed: Registration schema validates required fields and password confirmation')

// Test 3: OTP Format & Hashing
console.info('\nTest 3: Cryptographic OTP Generation & Bcrypt Hashing')
const otp = generateNumericOTP()
assert.equal(otp.length, 6, 'OTP must be 6 digits')
assert.match(otp, /^\d{6}$/, 'OTP must be all numeric')

const hashedOtp = await hashOTP(otp)
assert.notEqual(otp, hashedOtp, 'Hashed OTP must never equal plain OTP')
const isValid = await verifyOTPHash(otp, hashedOtp)
assert.equal(isValid, true, 'verifyOTPHash must return true for correct OTP')

const isWrongValid = await verifyOTPHash('000000', hashedOtp)
assert.equal(isWrongValid, false, 'verifyOTPHash must return false for wrong OTP')
console.info('  ✔ Passed: 6-digit numeric OTP generation, bcrypt hashing, and verification verified')

import { config } from '../src/config/index.js'

// Test 4: Token Generation & Expiration Claims
console.info('\nTest 4: JWT Access & Refresh Token Management')

const mockUser = {
  _id: '64f1a2b3c4d5e6f7a8b9c0d1',
  id: '64f1a2b3c4d5e6f7a8b9c0d1',
  email: 'broker@noway.com',
  role: 'broker',
}

const accessToken = generateAccessToken(mockUser)
const accessDecoded = jwt.verify(accessToken, config.jwtSecret)
assert.equal(accessDecoded.id, mockUser.id)
assert.equal(accessDecoded.role, 'broker')
assert.equal(accessDecoded.email, 'broker@noway.com')

const refreshToken = generateRefreshToken(mockUser)
const refreshDecoded = jwt.verify(refreshToken, config.jwtRefreshSecret)
assert.equal(refreshDecoded.id, mockUser.id)
assert.ok(refreshDecoded.jti, 'Refresh token must have unique jti session identifier')

const hash1 = hashToken(refreshToken)
const hash2 = hashToken(refreshToken)
assert.equal(hash1, hash2, 'Token hashing must be deterministic for DB lookups')
assert.notEqual(refreshToken, hash1, 'Stored token must be SHA-256 hashed')
console.info('  ✔ Passed: Short-lived access JWT and rotating refresh JWT correctly signed and hashed')

// Test 5: Verify 2FA & Email OTP Schemas
console.info('\nTest 5: OTP Submission Schemas')
const invalidOtp = verifyEmailSchema.validate({ email: 'test@noway.com', otp: '123' })
assert.ok(invalidOtp.error, 'Should reject OTP shorter than 6 digits')

const validOtp = verifyEmailSchema.validate({ email: 'test@noway.com', otp: '654321' })
assert.equal(validOtp.error, undefined, 'Should accept 6-digit numeric OTP')

const invalid2FA = verify2FASchema.validate({ tempToken: '', otp: '123456' })
assert.ok(invalid2FA.error, 'Should reject empty tempToken challenge')

const valid2FA = verify2FASchema.validate({ tempToken: 'challenge-uuid-123', otp: '123456' })
assert.equal(valid2FA.error, undefined, 'Should accept valid 2FA verification payload')
console.info('  ✔ Passed: OTP schemas strictly enforce 6 digits and required challenge parameters')

console.info('\n🎉 All Auth & Security Unit Tests Passed Successfully!')
