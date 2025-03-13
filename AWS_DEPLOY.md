# AWS ECS Fargate Deployment Guide

This guide walks through deploying a dockerized Next.js application on AWS ECS using Fargate.

## Prerequisites

- Docker installed and running
- AWS account with appropriate permissions
- AWS CLI installed and configured
- npm or yarn package manager
- Your Next.js application ready for deployment

## Deployment Steps

### 1. Create Security Group

1. **Navigate to Security Group Creation**

   - Log into AWS Console
   - Go to EC2 → Security Groups → Create Security Group

2. **Configure Security Group**

   ```ini
   Name: your-app-sg
   Description: Security group for Next.js app on ECS
   VPC: Default VPC
   ```

3. **Add Inbound Rules**

   - Type: Custom TCP
   - Port Range: 3000
   - Source: Anywhere (0.0.0.0/0)
   - Description: Allow inbound traffic to Next.js app

4. **Add Outbound Rules**
   - Type: All Traffic
   - Port Range: All
   - Destination: Anywhere (0.0.0.0/0)

### 2. Build and Test Docker Image

1. **Build Docker Image**

   ```bash
   docker build -t food-delivery-app .
   ```

2. **Test Locally**
   ```bash
   docker run -p 3000:3000 food-delivery-app
   ```

### 3. Push to Amazon ECR

1. **Create ECR Repository**

   - Go to AWS Console → ECR
   - Click "Create repository"
   - Name your repository
   - Keep default settings
   - Click "Create"

2. **Push to ECR**

   ```bash
   # Authenticate Docker to ECR
   aws ecr get-login-password --region your-region | docker login --username AWS --password-stdin your-account-id.dkr.ecr.your-region.amazonaws.com

   # Tag image
   docker tag food-delivery-app:latest your-account-id.dkr.ecr.your-region.amazonaws.com/food-delivery-app:latest

   # Push image
   docker push your-account-id.dkr.ecr.your-region.amazonaws.com/food-delivery-app:latest
   ```

### 4. Create ECS Cluster

1. **Create Cluster**

   - Go to AWS Console → ECS
   - Click "Create Cluster"
   - Select "AWS Fargate"
   - Name your cluster
   - Click "Create"

2. **Create Task Definition**

   ```ini
   Family: food-delivery-app
   Launch type: FARGATE
   Operating system family: Linux
   CPU: 0.5 vCPU
   Memory: 1GB
   Container name: food-delivery-app
   Image: your-ecr-image-uri
   Port mappings: 3000
   ```

3. **Create Service**
   - Go to your cluster
   - Click "Create Service"
   ```ini
   Launch type: FARGATE
   Service name: food-delivery-app-service
   Number of tasks: 1
   Security group: Select the one created earlier
   ```

### 5. Access Your Application

1. **Find Public IP**

   - Go to ECS Cluster
   - Click on Service
   - Click on running Task
   - Find Public IP

2. **Access Application**
   ```
   http://your-public-ip:3000
   ```

## Common Issues and Solutions

1. **Container Health Check Failing**

   - Verify port mappings match your application
   - Check security group rules
   - Verify container logs in CloudWatch

2. **Cannot Pull Image**

   - Verify ECR permissions
   - Check image URI is correct
   - Ensure task execution role has proper permissions

3. **Application Not Accessible**
   - Verify security group rules
   - Check if container is running on correct port
   - Verify public IP is accessible

### Best Practices

1. **Security**

   - Use specific security group rules
   - Implement HTTPS using ALB
   - Regular security updates

2. **Monitoring**

   - Set up CloudWatch alarms
   - Monitor container metrics
   - Enable container insights

3. **Cost Optimization**
   - Right-size task CPU/Memory
   - Use Spot instances where applicable
   - Monitor and optimize resource usage

## Note: Always follow AWS best practices for production deployments

## Refer this: https://dev.to/nadaahmed/deploying-a-dockerized-web-app-on-aws-using-ecs-and-fargate-a-step-by-step-guide-254m?utm_source=chatgpt.com
