import * as Aws from 'aws-sdk';
import * as React from 'react';

const lambda = new Aws.Lambda({
	apiVersion: '2015-03-31',
	region: 'us-east-2'
});

export const FileList = () => {
	const [ response, setResponse ] = React.useState<string>('Loading...');

	React.useEffect(() => {
		(async function invoke() {
			lambda.invoke({
				FunctionName: 'simple-sftp-dev-service',
				Payload: JSON.stringify({})
			}).promise()
				.then((data) => {
					const response = data.Payload?.toString() ?? 'No data received';
					setResponse(response);
				})
				.catch((err: any) => {
					console.log(err, 'Request failed');
					setResponse(err.toString());
				});
		})();
	});

	return (
		<div>{response}</div>
	);
};
