import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import { createS3Bucket } from "./platform/providers/aws/factories/s3";
import { createVpc } from "./platform/providers/aws/factories/vpc";
import { createEc2 } from "./platform/providers/aws/factories/ec2";

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

const subnetId = vpc.subnetIds[0];

const webServer = createEc2({
    name: "zen-webserver",
    instanceType: "t3.micro",
    ami: "ami-0b6c6ebed2801a5cb", // Ubuntu
    subnetId: subnetId,
    tags: { Environment: "dev", Project: "zen-learning" },
    vpc: vpc, // pass VPC outputs to EC2 factory
});

export const ec2Id = webServer.instanceId;
export const ec2Ip = webServer.publicIp;
export const logsBucketName = logsBucket.bucketName;
export const logsBucketArn = logsBucket.bucketArn;
export const vpcId = vpc.vpcId;
export const vpcArn = vpc.vpcArn;

