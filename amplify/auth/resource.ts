/**
 * Authentication resource configuration file.
 * Defines settings for Cognito User Pool, including login methods, password policies, and MFA settings.
 */

import { defineAuth } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: true, // Enables email-based authentication
    // Other options available:
    // phone: true,        // Enable phone authentication
    // username: true,     // Enable username authentication
    // social: ['GOOGLE'], // Enable social providers
  },
  // Additional configurations available:
  // mfa: { required: true },
  // passwordPolicy: { minLength: 8 },
  // verification: { email: true },
});
