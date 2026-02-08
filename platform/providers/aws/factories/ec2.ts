import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import { VpcOutputs } from "./vpc"; // import the VPC outputs

// 1️⃣ Input interface
export interface Ec2Args {
    name: string;
    instanceType: aws.ec2.InstanceType;
    ami: pulumi.Input<string>; // AMI ID
    subnetId: pulumi.Input<string>; // subnet to launch in
    tags?: Record<string, string>;
    vpc: VpcOutputs; // include VPC outputs to access subnet IDs
    subnetIndex?: number; // optional index to select subnet from VPC outputs
}

// 2️⃣ Output interface
export interface Ec2Outputs {
    instanceId: pulumi.Output<string>;
    publicIp: pulumi.Output<string>;
}

// 3️⃣ Factory function
export function createEc2(args: Ec2Args): Ec2Outputs {
    const instance = new aws.ec2.Instance(args.name, {
        instanceType: args.instanceType,
        ami: args.ami,
        subnetId: args.subnetIndex !== undefined ? args.vpc.subnetIds[args.subnetIndex] : args.subnetId,
        tags: args.tags
    });

    return {
        instanceId: instance.id,
        publicIp: instance.publicIp,
    };
}
