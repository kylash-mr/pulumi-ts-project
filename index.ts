import { createS3Bucket } from "./platform/providers/aws/factories/s3";

const logsBucket = createS3Bucket({
    name: "zen-logs-bucket",
    versioning: true,
});

export const logsBucketName = logsBucket.bucketName;
export const logsBucketArn = logsBucket.bucketArn;
