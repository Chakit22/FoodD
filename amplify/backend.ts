/**
 * Main Amplify backend configuration file.
 * This file defines and exports all AWS resources that will be created in your cloud infrastructure.
 */

import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";

const backend = defineBackend({
  auth, // Configure authentication resources (Cognito User Pool, Identity Pool, etc.)
});

export default backend;
