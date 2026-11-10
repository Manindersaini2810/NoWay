import Joi from 'joi'

// Password policy regex:
// At least one uppercase, one lowercase, one number, one special character, 8-128 chars, no only-spaces
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,128}$/

export const passwordValidation = Joi.string()
  .min(8)
  .max(128)
  .pattern(PASSWORD_REGEX)
  .required()
  .messages({
    'string.min': 'Password must be at least 8 characters long.',
    'string.max': 'Password cannot exceed 128 characters.',
    'string.pattern.base':
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    'any.required': 'Password is required.',
  })

export const registerSchema = Joi.object({
  name: Joi.string().trim().max(100).optional().allow(''),
  firstName: Joi.string().trim().max(50).optional().allow(''),
  lastName: Joi.string().trim().max(50).optional().allow(''),
  email: Joi.string().trim().lowercase().email().required().messages({
    'string.email': 'Please provide a valid email address.',
    'any.required': 'Email is required.',
  }),
  password: passwordValidation,
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .optional()
    .messages({
      'any.only': 'Confirm password must match the original password.',
    }),
  role: Joi.string().valid('buyer', 'broker').default('buyer'),
  phone: Joi.string().trim().max(20).optional().allow('', null),
  company: Joi.string().trim().max(100).optional().allow('', null),
}).or('name', 'firstName')

export const loginSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().required(),
})

export const verifyEmailSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
  otp: Joi.string().trim().length(6).pattern(/^\d{6}$/).required().messages({
    'string.length': 'OTP must be exactly 6 digits.',
    'string.pattern.base': 'OTP must contain only numbers.',
  }),
})

export const resendEmailOtpSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
})

export const verify2FASchema = Joi.object({
  tempToken: Joi.string().required().messages({
    'any.required': 'Temporary 2FA challenge identifier is required.',
  }),
  otp: Joi.string().trim().length(6).pattern(/^\d{6}$/).required().messages({
    'string.length': 'OTP must be exactly 6 digits.',
    'string.pattern.base': 'OTP must contain only numbers.',
  }),
})

export const resend2FAOtpSchema = Joi.object({
  tempToken: Joi.string().required(),
})

export const googleAuthSchema = Joi.object({
  credential: Joi.string().required().messages({
    'any.required': 'Google ID token credential is required.',
  }),
  role: Joi.string().valid('buyer', 'broker').optional(),
})

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
})

export const resetPasswordSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
  token: Joi.string().required(),
  newPassword: passwordValidation,
  confirmPassword: Joi.string()
    .valid(Joi.ref('newPassword'))
    .optional()
    .messages({
      'any.only': 'Confirm password must match the new password.',
    }),
})

export const refreshSchema = Joi.object({
  refreshToken: Joi.string().optional().allow(''), // can come from body OR HttpOnly cookie
})
