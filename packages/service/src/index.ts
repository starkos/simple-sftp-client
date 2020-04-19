import { Handler } from 'aws-lambda';
import * as pako from 'pako';
import * as Client from 'ssh2-sftp-client';

const config = {
	host: process.env.SFTP_HOST_ADDR,
	port: 22,
	username: process.env.SFTP_USER,
	password: process.env.SFTP_PASS
};

export const handler: Handler =  async function(event: any): Promise<any> {
	return new Promise((resolve, reject) => {
		const sftp = new Client();

		switch (event.command) {
		case 'list':
			sftp.connect(config)
				.then(() => {
					return sftp.list(event.path);
				})
				.then(files => {
					const json = JSON.stringify(files);
					const deflated = pako.deflate(json, { to: 'string' });
					const encoded = Buffer.from(deflated).toString('base64');
					resolve(encoded);
					sftp.end();
				})
				.catch(err => {
					reject(err);
					sftp.end();
				});
			break;

		default:
			throw new Error(`Unknown command "${event.command}" received`);
		}
	});
};
