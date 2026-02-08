import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

export interface S3BucketArgs {
    name: string;
    versioning?: boolean;
    tags?: Record<string, string>;
}

export interface S3BucketOutputs {
    bucketName: pulumi.Output<string>;
    bucketArn: pulumi.Output<string>;
}

export function createS3Bucket(args: S3BucketArgs): S3BucketOutputs {
    const bucket = new aws.s3.Bucket(args.name, {
        versioning: args.versioning ? { enabled: true } : undefined,
        tags: args.tags
    });

    return {
        bucketName: bucket.id,
        bucketArn: bucket.arn,
    };
}
