# simple-sftp-client

A simple proof-of-concept SFTP web client which uses an AWS Lambda service to control a remote SFTP server.

I ran into a case where we needed to share a lot of files with clients via SFTP, but some of them were uncomfortable installing and using old-school SFTP applications like [FileZilla](https://filezilla-project.org). Others were simply not allowed to install any applications into their work environments. I threw this together over a weekend to see if a web front-end over an existing SFTP server might be feasible.

The project is structured as a monorepo with two projects: a web client to navigate and interact with the filesets, and a backend service to mediate communication between the client and SFTP server.

I use...

- [Lerna](https://lerna.js.org) to manage the monorepo
- [Serverless](https://serverless.com) to manage deployments
- [TypeScript](https://www.typescriptlang.org) for both components
- [React](https://reactjs.org) for the web client
- [Jest](https://jestjs.io) for testing (but since I blasted this out in a weekend there aren't many)

## Setup

Before deploying, create an IAM policy allowing invoke access to the Lambda functions. We'll allow anyone to call our function, but they will have to provide valid credentials for the target SFTP server in order to actually do anything useful with it.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "SimpleSftpClient",
            "Effect": "Allow",
            "Action": "lambda:InvokeFunction",
            "Resource": "arn:aws:lambda:*:*:function:simple-sftp-*-service"
        }
    ]
}
```

Then create an IAM user with **Programmatic access**. Assign the above IAM policy to it, and note the access key and secret.

Finally, create a new, untracked file named `.env` at the project root and set the variables below to configure your deploy. These will be stored as environment variables for the Lambda service.

```
SFTP_HOST_ADDR = <your SFTP host's address>
SFTP_AWS_KEY = <the AWS user access key from above>
SFTP_AWS_SECRET = <the AWS user access secret from above>
```

## Build & Deploy

To build, test, and deploy the project:

```sh
# Initialize the project
$ npm install
$ npx lerna bootstrap

# Run unit tests
$ npx lerna run test

# Deploy
$ npx lerna run deploy # dev build is default
$ npx lerna run deploy -- -- --stage prod
```

## Notes

- The client invokes the Lambda service directly rather then using AWS API Gateway, because API Gateway is relatively expensive
