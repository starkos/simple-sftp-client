import * as Aws from 'aws-sdk';
import * as pako from 'pako';

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
				} else if (data.FunctionError) {
					const payload = JSON.parse(data.Payload.toString());
					reject(payload.errorMessage ?? 'Unknown error');
				} else {
					const payload = JSON.parse(data.Payload as string) as string;
					const decoded = Buffer.from(payload, 'base64').toString('utf8');
					const inflated = pako.inflate(decoded, { to: 'string' });
					resolve(JSON.parse(inflated));
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
