import * as Aws from 'aws-sdk';

const lambda = new Aws.Lambda({
	apiVersion: '2015-03-31',
	region: 'us-east-2'
});

const lambdaFunctionName = 'simple-sftp-dev-service';

export class SftpFile
{
	type: string;
	name: string;

	constructor(fileName: string) {
		this.type = 'f';
		this.name = fileName;
	}
}

export class Sftp
{
	private static async call(payload: string): Promise<any> {
		return new Promise((resolve, reject) => {
			const params = {
				FunctionName: lambdaFunctionName,
				Payload: payload
			};

			lambda.invoke(params, (err, data) => {
				if (err) {
					reject(err.message);
				} else if (!data.Payload) {
					reject('No data received');
				} else {
					const payload = JSON.parse(data.Payload.toString());
					if (data.FunctionError) {
						reject(payload.errorMessage ?? 'Unknown error');
					} else {
						resolve(payload);
					}
				}
			});
		});
	}


	static async ls(path: string): Promise<File[]> {
		const payload = JSON.stringify({
			command: 'list',
			path: path
		});
		const response = await Sftp.call(payload);
		return response;
	}
}
