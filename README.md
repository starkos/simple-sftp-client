# simple-sftp-client

A simple SFTP pass-through service and React-based front-end.

Some folks we work with aren't comfortable using old-school SFTP applications like [FileZilla](https://filezilla-project.org); some can't easily install applications in their work environments.
This weekend proof-of-concept demonstrates using a minimal web application to navigate large filesets, sidestepping both issues.

The project consists of two parts: an AWS Lambda function that interacts with the SFTP server and passes through through the results, and a React SPA client to navigate the results, download files, etc.

## Pass-through Service

Deploy the service for the first time:

	$ cd service
	$ zip -r simple-sftp-passthru.zip .
    $ aws lambda create-function \
	  --function-name simple-sftp-passthru \
      --zip-file fileb://simple-sftp-passthru.zip \
	  --runtime nodejs12.x \
      --handler index.handler \
      --role arn:aws:iam::581420160027:role/lambda-basic-role

Using the AWS Console or command line, set the `SFTP_HOST_ADDR` environment variable to the address of the SFTP server.

Deploy an update; creates a new version while leaving the previous version(s) intact:

    $ aws lambda update-function-code \
	  --function-name simple-sftp-passthru \
      --zip-file fileb://simple-sftp-passthru.zip

Invoke the function (or use the AWS Lambda Console):

    $ aws lambda invoke \
	  --function-name simple-sftp-passthru \
      --payload '{"key": "value"}' \
	  outfile.txt

Remove function:

    $ aws lambda delete-function --function-name simple-sftp-passthru
