/**
 * Client-side Amplify configuration component.
 * This component initializes AWS Amplify on the client side with the necessary configurations.
 * Must be wrapped with 'use client' directive for Next.js client components.
 */

"use client";

import { Amplify } from "aws-amplify";
import outputs from "../../../amplify_outputs.json";

Amplify.configure(outputs, { ssr: true });

export default function ConfigureAmplifyClientSide() {
  return null;
}
