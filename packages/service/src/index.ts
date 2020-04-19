import { Handler } from 'aws-lambda';

export const handler: Handler =  async function(): Promise<string> {
	return new Promise<string>(function(resolve) {
		resolve('Request was received');
	});
};
