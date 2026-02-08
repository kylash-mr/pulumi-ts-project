import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

export interface VpcArgs {
    name: string;
    cidrBlock: string;
    tags?: Record<string, string>;
}

export interface SubnetArgs {
    name: string;
    vpcId: pulumi.Input<string>;
    cidrBlock: string;
    availabilityZone?: string;
    tags?: Record<string, string>;
}

export interface VpcOutputs {
    vpcId: pulumi.Output<string>;
    vpcArn: pulumi.Output<string>;
    subnetIds: pulumi.Output<string>[];
}

const subnetCidrs = ["10.0.1.0/24", "10.0.2.0/24"];

export function createVpc(args: VpcArgs): VpcOutputs {
    const vpc = new aws.ec2.Vpc(args.name, {
        cidrBlock: args.cidrBlock,
        tags: args.tags
    });

    const subnets = subnetCidrs.map((cidr, index) => {
    return new aws.ec2.Subnet(`${args.name}-subnet-${index + 1}`, {
        vpcId: vpc.id,
        cidrBlock: cidr
    });
});
    return {
        vpcId: vpc.id,
        vpcArn: vpc.arn,
        subnetIds: subnets.map(subnet => subnet.id)
    };
}

