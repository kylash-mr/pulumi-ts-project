import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

export interface VpcArgs {
    name: string;
    cidrBlock: string;
    tags?: Record<string, string>;
}

export interface VpcOutputs {
    vpcId: pulumi.Output<string>;
    vpcArn: pulumi.Output<string>;
}

export function createVpc(args: VpcArgs): VpcOutputs {
    const vpc = new aws.ec2.Vpc(args.name, {
        cidrBlock: args.cidrBlock,
        tags: args.tags
    });

    return {
        vpcId: vpc.id,
        vpcArn: vpc.arn,
    };
}

