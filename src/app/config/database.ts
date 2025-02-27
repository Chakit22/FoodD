import AWS from "aws-sdk";

const ssm = new AWS.SSM({ region: "us-east-1" });

export async function getDatabaseUrl() {
  const param = await ssm
    .getParameter({ Name: "/amplify/database-url", WithDecryption: true })
    .promise();
  return param.Parameter?.Value;
}
