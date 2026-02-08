import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import { createS3Bucket } from "./platform/providers/aws/factories/s3";
import { createVpc } from "./platform/providers/aws/factories/vpc";

const logsBucket = createS3Bucket({
    name: "zen-logs-bucket",
    versioning: true,
    tags: {
        Environment: "dev",
        Project: "zen-learning"
    }
});

const vpc = createVpc({
    name: "zen-vpc",
    cidrBlock: "10.0.0.0/16",
    tags: {
        Environment: "dev",
        Project: "zen-learning"
    }})
export const logsBucketName = logsBucket.bucketName;
export const logsBucketArn = logsBucket.bucketArn;
export const vpcId = vpc.vpcId;
export const vpcArn = vpc.vpcArn;
