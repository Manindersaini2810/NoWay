import nodemailer from 'nodemailer'
import { config } from '../config/index.js'

let transporter = null

const getTransporter = () => {
  if (!transporter) {
    if (config.email.host && config.email.user && config.email.pass) {
      transporter = nodemailer.createTransport({
        host: config.email.host,
        port: config.email.port || 587,
        secure: config.email.port === 465,
        auth: {
          user: config.email.user,
          pass: config.email.pass,
        },
      })
    } else {
      // Development mock transporter (logs to console)
      transporter = {
        sendMail: async (mailOptions) => {
          console.info('\n======================================================')
          console.info('📧 [DEV EMAIL INTERCEPTED - No external SMTP configured]')
          console.info(`To:      ${mailOptions.to}`)
          console.info(`Subject: ${mailOptions.subject}`)
          console.info('------------------------------------------------------')
          if (mailOptions.text) console.info(mailOptions.text)
          console.info('======================================================\n')
          return { messageId: `mock-${Date.now()}` }
        },
      }
    }
  }
  return transporter
}

/**
 * Base email layout using NoWay official Charcoal (60%), Sand (30%), Electric Blue (10%) palette.
 */
const baseTemplate = ({ title, preheader, contentHtml }) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #D8CBB3;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #1E1E1C;
    }
    .wrapper {
      width: 100%;
      background-color: #D8CBB3;
      padding: 32px 16px;
    }
    .container {
      max-width: 580px;
      margin: 0 auto;
      background-color: #EDE4D4;
      border-radius: 24px;
      overflow: hidden;
      border: 1px solid rgba(30, 30, 28, 0.15);
      box-shadow: 0 10px 25px rgba(30, 30, 28, 0.08);
    }
    .header {
      background-color: #1E1E1C;
      padding: 32px 28px;
      text-align: center;
      border-bottom: 2px solid #2F6BFF;
    }
    .logo-text {
      color: #D8CBB3;
      font-size: 24px;
      font-weight: 900;
      letter-spacing: -0.5px;
      text-transform: uppercase;
      margin: 0;
    }
    .logo-accent {
      color: #2F6BFF;
    }
    .content {
      padding: 36px 32px;
      background-color: #EDE4D4;
      color: #1E1E1C;
      font-size: 15px;
      line-height: 1.6;
    }
    .otp-box {
      margin: 28px 0;
      padding: 20px;
      background-color: #1E1E1C;
      color: #2F6BFF;
      border-radius: 16px;
      text-align: center;
      font-size: 36px;
      font-weight: 900;
      letter-spacing: 8px;
      border: 1px solid rgba(47, 107, 255, 0.4);
    }
    .btn {
      display: inline-block;
      background-color: #2F6BFF;
      color: #ffffff !important;
      text-decoration: none;
      font-weight: 800;
      font-size: 14px;
      padding: 14px 32px;
      border-radius: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 20px 0;
    }
    .footer {
      background-color: #1E1E1C;
      color: rgba(216, 203, 179, 0.6);
      padding: 24px;
      text-align: center;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1 class="logo-text">No<span class="logo-accent">Way</span></h1>
        <p style="color: rgba(216, 203, 179, 0.7); font-size: 11px; margin: 6px 0 0; text-transform: uppercase; letter-spacing: 1px;">
          Commercial Property Intelligence
        </p>
      </div>
      <div class="content">
        ${contentHtml}
      </div>
      <div class="footer">
        <p style="margin: 0 0 6px;">© ${new Date().getFullYear()} NoWay Commercial Real Estate Inc.</p>
        <p style="margin: 0;">Institutional Security & Machine Learning Valuations</p>
      </div>
    </div>
  </div>
</body>
</html>
  `
}

/**
 * 1. Email Verification OTP
 */
export const sendEmailVerificationOTP = async (email, otp, name = 'User') => {
  const mailer = getTransporter()
  const contentHtml = `
    <h2 style="font-size: 20px; font-weight: 800; margin-top: 0; color: #1E1E1C;">Verify Your Email Address</h2>
    <p>Hello ${name},</p>
    <p>Thank you for registering on <strong>NoWay</strong>. To activate your commercial investor & broker access, please enter the following 6-digit verification code:</p>
    <div class="otp-box">${otp}</div>
    <p style="font-size: 13px; color: rgba(30, 30, 28, 0.7);">
      This OTP is valid for <strong>5 minutes</strong>. If you did not register for an account, please ignore this email.
    </p>
  `
  return mailer.sendMail({
    from: config.email.from || '"NoWay Security" <no-reply@noway.com>',
    to: email,
    subject: `NoWay — Your Email Verification Code: ${otp}`,
    text: `Your NoWay email verification code is: ${otp}. It expires in 5 minutes.`,
    html: baseTemplate({ title: 'Verify Your Email Address', contentHtml }),
  })
}

/**
 * 2. Login Verification OTP (2FA)
 */
export const send2FALoginOTP = async (email, otp, name = 'User') => {
  const mailer = getTransporter()
  const contentHtml = `
    <h2 style="font-size: 20px; font-weight: 800; margin-top: 0; color: #1E1E1C;">Two-Step Login Verification</h2>
    <p>Hello ${name},</p>
    <p>A sign-in attempt was initiated for your NoWay account. Please enter the one-time code below to complete your login:</p>
    <div class="otp-box">${otp}</div>
    <p style="font-size: 13px; color: rgba(30, 30, 28, 0.7);">
      This code is valid for <strong>5 minutes</strong> and can only be used once. If you did not attempt to sign in, please secure your account immediately.
    </p>
  `
  return mailer.sendMail({
    from: config.email.from || '"NoWay Security" <security@noway.com>',
    to: email,
    subject: `NoWay — Login Verification Code: ${otp}`,
    text: `Your NoWay login verification OTP is: ${otp}. Valid for 5 minutes.`,
    html: baseTemplate({ title: 'Two-Step Login Verification', contentHtml }),
  })
}

/**
 * 3. Google Sign-In Second-Factor OTP
 */
export const sendGoogle2FAOTP = async (email, otp, name = 'User') => {
  const mailer = getTransporter()
  const contentHtml = `
    <h2 style="font-size: 20px; font-weight: 800; margin-top: 0; color: #1E1E1C;">Google Identity Verification (2FA)</h2>
    <p>Hello ${name},</p>
    <p>You authenticated using Google Identity Services. Because two-step verification is enabled on your institutional account, enter the one-time code below to finalize access:</p>
    <div class="otp-box">${otp}</div>
    <p style="font-size: 13px; color: rgba(30, 30, 28, 0.7);">
      Code expires in <strong>5 minutes</strong>. If this wasn't you, please disconnect Google access and change your security credentials.
    </p>
  `
  return mailer.sendMail({
    from: config.email.from || '"NoWay Security" <security@noway.com>',
    to: email,
    subject: `NoWay — Google Sign-in Verification Code: ${otp}`,
    text: `Your NoWay Google sign-in 2FA OTP is: ${otp}.`,
    html: baseTemplate({ title: 'Google Identity Verification', contentHtml }),
  })
}

/**
 * 4. Password Reset Email
 */
export const sendPasswordResetEmail = async (email, resetUrl, resetToken, name = 'User') => {
  const mailer = getTransporter()
  const contentHtml = `
    <h2 style="font-size: 20px; font-weight: 800; margin-top: 0; color: #1E1E1C;">Reset Your Password</h2>
    <p>Hello ${name},</p>
    <p>We received a request to reset the password for your NoWay account. Click the button below to set a new password:</p>
    <div style="text-align: center; margin: 24px 0;">
      <a href="${resetUrl}" class="btn">Reset Password</a>
    </div>
    <p style="font-size: 13px; color: rgba(30, 30, 28, 0.8);">
      Or copy and paste this link in your browser:<br/>
      <a href="${resetUrl}" style="color: #2F6BFF; word-break: break-all;">${resetUrl}</a>
    </p>
    <p style="font-size: 13px; color: rgba(30, 30, 28, 0.7);">
      This reset link is valid for <strong>15 minutes</strong>. If you did not request a password reset, no further action is required.
    </p>
  `
  return mailer.sendMail({
    from: config.email.from || '"NoWay Support" <support@noway.com>',
    to: email,
    subject: 'NoWay — Password Reset Request',
    text: `Reset your NoWay password using this link (valid 15 minutes): ${resetUrl}`,
    html: baseTemplate({ title: 'Reset Your Password', contentHtml }),
  })
}

/**
 * 5. Security Alert Email (New Login)
 */
export const sendSecurityAlertEmail = async (email, details = {}, name = 'User') => {
  const mailer = getTransporter()
  const contentHtml = `
    <h2 style="font-size: 20px; font-weight: 800; margin-top: 0; color: #1E1E1C;">New Login Detected</h2>
    <p>Hello ${name},</p>
    <p>Your NoWay account was recently accessed from a new device or IP address:</p>
    <div style="background-color: #ffffff; padding: 16px 20px; border-radius: 12px; margin: 16px 0; border: 1px solid rgba(30,30,28,0.1);">
      <p style="margin: 4px 0;"><strong>Time:</strong> ${new Date().toUTCString()}</p>
      <p style="margin: 4px 0;"><strong>IP Address:</strong> ${details.ip || 'Unknown'}</p>
      <p style="margin: 4px 0;"><strong>Device / Browser:</strong> ${details.userAgent || 'Unknown'}</p>
    </div>
    <p style="font-size: 13px; color: rgba(30, 30, 28, 0.7);">
      If this was you, you can safely ignore this alert. If you do not recognize this activity, please reset your password and terminate active sessions immediately.
    </p>
  `
  return mailer.sendMail({
    from: config.email.from || '"NoWay Security" <security@noway.com>',
    to: email,
    subject: 'NoWay Security Alert — New Sign-in Detected',
    text: `New sign-in detected for your NoWay account from ${details.ip || 'Unknown'}.`,
    html: baseTemplate({ title: 'New Login Detected', contentHtml }),
  })
}

/**
 * 6. Password Changed Notification
 */
export const sendPasswordChangedEmail = async (email, name = 'User') => {
  const mailer = getTransporter()
  const contentHtml = `
    <h2 style="font-size: 20px; font-weight: 800; margin-top: 0; color: #1E1E1C;">Password Successfully Changed</h2>
    <p>Hello ${name},</p>
    <p>Your NoWay account password was successfully updated on <strong>${new Date().toUTCString()}</strong>.</p>
    <p style="font-size: 13px; color: rgba(30, 30, 28, 0.7);">
      All prior refresh token sessions have been revoked for your protection. If you did not make this change, please contact NoWay Security immediately.
    </p>
  `
  return mailer.sendMail({
    from: config.email.from || '"NoWay Security" <security@noway.com>',
    to: email,
    subject: 'NoWay — Your Password Was Changed',
    text: 'Your NoWay password was successfully updated. All prior sessions were invalidated.',
    html: baseTemplate({ title: 'Password Successfully Changed', contentHtml }),
  })
}

export default {
  sendEmailVerificationOTP,
  send2FALoginOTP,
  sendGoogle2FAOTP,
  sendPasswordResetEmail,
  sendSecurityAlertEmail,
  sendPasswordChangedEmail,
}
