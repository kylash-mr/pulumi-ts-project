import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import { createS3Bucket } from "./platform/providers/aws/factories/s3";

const logsBucket = createS3Bucket({
    name: "zen-logs-bucket",
    versioning: true,
    tags: {
        Environment: "dev",
        Project: "zen-learning"
    }
});

export const logsBucketName = logsBucket.bucketName;
export const logsBucketArn = logsBucket.bucketArn;
