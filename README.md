# simple-sftp-client

A simple SFTP pass-through service and React-based client proof-of-concept.

Some folks we work with aren't comfortable using old-school SFTP applications like [FileZilla](https://filezilla-project.org), or can't easy install applications in their work environments. This weekend proof-of-concept is intended to demonstrate the viability of using a web front-end to navigate the large filesets involved.

## Pass-through Service

To install the service:

	$ cd service
	$ zip -r simple-sftp-passthru.zip .
    $ aws lambda create-function \
	  --function-name simple-sftp-passthru \
      --zip-file fileb://simple-sftp-passthru.zip \
	  --runtime nodejs12.x \
      --handler index.handler \
      --role arn:aws:iam::581420160027:role/lambda-basic-role

Update an existing function; creates a new version while leaving the previous
version(s) intact:

    $ aws lambda update-function-code \
	  --function-name simple-sftp-passthru \
      --zip-file fileb://simple-sftp-passthru.zip

Invoke the function (or use the AWS Lambda Console):

    $ aws lambda invoke \
	  --function-name simple-sftp-passthru \
      --payload '{"key": "value"}' \
	  outfile.txt
