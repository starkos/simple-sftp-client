import * as path from 'path';
import * as React from 'react';

import { Sftp, SftpFile } from '../../models/sftp';

import { FolderNavigator } from '../../components/FolderNavigator';
import { FileList } from '../../components/FileList';
import { ErrorMessage } from '../../components/ErrorMessage';

export const SftpNavigator  = () => {
	const [ status, setStatus ] = React.useState<string>('LOADING');
	const [ cwd, setCwd ] = React.useState<string>('/');
	const [ files, setFiles ] = React.useState<SftpFile[]>([]);
	const [ lastError, setLastError ] = React.useState<any>(null);

	const onNavClick = (newCwd: string) => {
		setCwd(newCwd);
	};

	const onFileClick = (file: SftpFile) => {
		console.log(JSON.stringify(file));
		setCwd(path.join(cwd, file.name));
	};

	React.useEffect(() => {
		setStatus('LOADING');
		setFiles([]);

		Sftp.ls(cwd)
			.then(files => {
				setStatus('LOADED');
				setFiles(files);
			})
			.catch(err => {
				setStatus('ERROR');
				setLastError(`ERROR: ${err}`);
			});
	}, [cwd]);

	return (
		<div>
			<FolderNavigator cwd={cwd} onClick={onNavClick} />
			<ErrorMessage error={lastError} />
			<FileList status={status} files={files} onClick={onFileClick} />
		</div>
	);
};
