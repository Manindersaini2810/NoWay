import { OAuth2Client } from 'google-auth-library'

const googleClientId = process.env.GOOGLE_CLIENT_ID || ''
const client = new OAuth2Client(googleClientId)

/**
 * Verifies a Google ID token received from Google Identity Services.
 * Validates signature, expiration, issuer, audience, and email_verified flag.
 *
 * @param {string} idToken - The Google JWT credential string.
 * @returns {Promise<{ googleId: string, email: string, name: string, picture: string }>}
 */
export const verifyGoogleIdToken = async (idToken) => {
  if (!idToken) {
    throw new Error('Google credential token is required')
  }

  // If in local dev and a mock token is passed for testing
  if (process.env.NODE_ENV !== 'production' && idToken.startsWith('mock-google-token-')) {
    const email = idToken.replace('mock-google-token-', '')
    return {
      googleId: `google-mock-${Date.now()}`,
      email: email.toLowerCase(),
      name: email.split('@')[0],
      picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    }
  }

  const ticket = await client.verifyIdToken({
    idToken,
    audience: googleClientId || undefined,
  })

  const payload = ticket.getPayload()
  if (!payload) {
    throw new Error('Invalid Google token payload')
  }

  // Ensure email was verified by Google
  if (!payload.email_verified) {
    throw new Error('Google email is not verified')
  }

  // Ensure issuer matches Google
  const validIssuers = ['accounts.google.com', 'https://accounts.google.com']
  if (!validIssuers.includes(payload.iss)) {
    throw new Error('Invalid Google token issuer')
  }

  return {
    googleId: payload.sub, // Stable unique Google user ID
    email: payload.email.toLowerCase(),
    name: payload.name || payload.email.split('@')[0],
    picture: payload.picture || '',
  }
}

export default {
  verifyGoogleIdToken,
}
