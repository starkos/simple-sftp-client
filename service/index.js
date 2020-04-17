const Client = require('ssh2-sftp-client');

exports.handler =  async function (/*event, context*/) {
	console.log(`Connecting to ${process.env.SFTP_HOST_ADDR}\n`);

	const promise = new Promise(function(resolve, reject) {
		console.log('Connecting...');
		const sftp = new Client();
		sftp.connect({
			host: process.env.SFTP_HOST_ADDR,
			port: 22,
			username: process.env.SFTP_USER,
			password: process.env.SFTP_PASS
		}).then(() => {
			console.log('Connected');
			resolve('Connected!');
		}).catch(err => {
			console.log(err, 'Failed');
			reject(err);
		});
	});

	return (promise);
};
