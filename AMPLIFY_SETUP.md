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

Why You Need to Allow Access to cdk-bootstrap:

### 1. Create an IAM user

1. **Create an IAM user**

   To create:

   1. Log into AWS Console
   2. Go to IAM → Users → Create user
   3. Add a username
   4. Click on Attach Policies directly
   5. Attach `AdministratorAccess-Amplify` policy
   6. Click on `Create user`

2. **Create a new policy**

   To create:

   1. Go to IAM → Policies -> Create policy. (Specify a Policy name. eg. AWSSystemsManager)
   2. Click on JSON
   3. Add this
      `{ "Version": "2012-10-17", "Statement": [ { "Effect": "Allow", "Action": [ "ssm:GetParameter", "ssm:GetParameters", "ssm:GetParametersByPath" ], "Resource": [ "arn:aws:ssm:ap-southeast-2:920372990381:parameter/PATH", "arn:aws:ssm:ap-southeast-2:920372990381:parameter/cdk-bootstrap/*" ] } ] }`
   4. Attach this poilicy to the create user
   5. Fetch the `ACCESS_KEY` and `SECRET_KEY` to be used in the next step.

## Note: If you’re using npx ampx sandbox (or any Amplify process that might trigger CDK deployment), Amplify might need to read some of the bootstrap information stored in SSM Parameter Store (under the path cdk-bootstrap/\*). This is why you need to give it permission to access that specific path. Amplify may use `AWS CDK` behind the scenes to deploy or manage certain infrastructure components. During this Amplify might need certain parameters from the `SSM` store, henceforth it is added.

### 2. AWS Credentials Setup

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

### 3. Initialize Amplify Backend Files

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

### 4. Create Sandbox Environment

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

### 5. Configure Client Application

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
