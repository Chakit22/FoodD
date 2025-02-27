# AWS Amplify Authentication Setup Guide

This guide walks through setting up AWS Amplify authentication in a Next.js application.

## Prerequisites

- Node.js installed (v14 or later)
- AWS account with appropriate permissions
- AWS CLI installed and configured
- npm or yarn package manager

## Installation Steps

### 1. Install Required Packages

```bash
# Using npm
npm install aws-amplify @aws-amplify/ui-react @aws-amplify/backend

# Or using yarn
yarn add aws-amplify @aws-amplify/ui-react @aws-amplify/backend
```

### 2. Add Amplify UI Styles

Add the following import to your root layout or main CSS file:

```typescript
import "@aws-amplify/ui-react/styles.css";
```

## Local Development Setup

### 1. AWS Credentials Setup

1. **Create AWS Credentials File**

   - Create/edit `~/.aws/credentials` file (Windows: `C:\Users\YOUR_USER\.aws\credentials`)

   ```ini
   [default]
   aws_access_key_id = YOUR_ACCESS_KEY
   aws_secret_access_key = YOUR_SECRET_KEY
   ```

   - Create/edit `~/.aws/config` file (Windows: `C:\Users\YOUR_USER\.aws\config`)

   ```ini
   [default]
   region = your-region
   output = json
   ```

   To get these credentials:

   1. Log into AWS Console
   2. Go to IAM → Users → Your User → Security Credentials
   3. Create Access Key
   4. Save the credentials securely

### 2. Initialize Amplify Backend Files

1. **Create Project Directory Structure**

   ```bash
   mkdir -p amplify/auth
   ```

2. **Create Backend Configuration** (`amplify/backend.ts`):

   ```typescript
   import { defineBackend } from "@aws-amplify/backend";
   import { auth } from "./auth/resource";

   const backend = defineBackend({
     auth,
   });

   export default backend;
   ```

3. **Create Auth Resource** (`amplify/auth/resource.ts`):

   ```typescript
   import { defineAuth } from "@aws-amplify/backend";

   export const auth = defineAuth({
     loginWith: {
       email: true,
     },
   });
   ```

### 3. Create Sandbox Environment

1. **Start Sandbox Environment**

   ```bash
   npx ampx sandbox
   ```

   This command:

   - Creates a temporary AWS environment
   - Deploys your auth configuration
   - Generates `amplify_outputs.json` file
   - Resources are automatically cleaned up when you stop the sandbox

2. **Verify Generated Files**
   - Check that `amplify_outputs.json` was created in your project root
   - It should contain configurations like:
     - User Pool ID
     - Client ID
     - Identity Pool ID
     - AWS Region

### 4. Configure Client Application

1. **Add Client-Side Configuration** (`src/app/components/ConfigureAmplifyClientSide.tsx`):

   ```typescript
   "use client";
   import { Amplify } from "aws-amplify";
   import outputs from "../../../amplify_outputs.json";

   Amplify.configure(outputs, { ssr: true });
   ```

### 5. Development Workflow

1. **Start Development**

   ```bash
   # Terminal 1: Start Amplify sandbox
   npx ampx sandbox

   # Terminal 2: Start Next.js development server
   npm run dev
   ```

2. **Making Changes**

   - Edit `auth/resource.ts` for auth configuration changes
   - Changes are automatically detected and deployed to sandbox
   - Sandbox environment refreshes `amplify_outputs.json`

3. **Stopping Development**
   - Press `Ctrl+C` in the sandbox terminal
   - Sandbox resources are automatically cleaned up
   - No charges incurred for sandbox usage

### Common Issues and Solutions

1. **AWS Credentials Not Found**

   ```bash
   # Verify AWS credentials file
   cat ~/.aws/credentials

   # Verify AWS config file
   cat ~/.aws/config
   ```

2. **Sandbox Creation Fails**

   - Ensure AWS credentials have sufficient permissions
   - Check internet connectivity
   - Verify region settings in AWS config

3. **amplify_outputs.json Not Generated**
   - Ensure sandbox is running
   - Check for errors in sandbox terminal
   - Verify file permissions in project directory

### Best Practices for Local Development

1. **Version Control**

   ```gitignore
   # Add to .gitignore
   amplify_outputs.json
   .env
   ```

2. **Environment Variables**

   - Use `.env` for local-specific configurations
   - Never commit sensitive information

3. **Testing**
   - Test authentication flows in sandbox before deployment
   - Use different email addresses for testing
   - Verify error handling and edge cases
