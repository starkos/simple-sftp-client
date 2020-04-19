import * as React from 'react';

import { Sftp, SftpFile } from '../../models/sftp';

import { FolderNavigator } from '../../components/FolderNavigator';
import { FileList } from '../../components/FileList';
import { ErrorMessage } from '../../components/ErrorMessage';

export const SftpNavigator  = () => {
	const [ cwd, setCwd ] = React.useState<string>('/');
	const [ files, setFiles ] = React.useState<SftpFile[]>([]);
	const [ lastError, setLastError ] = React.useState<any>(null);

	React.useEffect(() => {
		Sftp.ls()
			.then(files => {
				console.log(JSON.stringify(files));
				setFiles(files);
			})
			.catch(err => {
				setLastError(`ERROR: ${err}`);
			});
	}, [cwd]);

	return (
		<div>
			<FolderNavigator cwd={cwd} />
			<ErrorMessage error={lastError} />
			<FileList files={files} />
		</div>
	);
};
