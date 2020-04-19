import * as React from 'react';

import { SftpFile } from '../../models/sftp';

import { FileLink } from '../FileLink';

interface FileListProps
{
	status: string;
	files: SftpFile[];
	onClick: Function;
}

export const FileList = (props: FileListProps) => {
	switch (props.status) {
	case 'LOADED':
		return (
			<div>
				{props.files.map(file =>
					<FileLink key={file.name} file={file} onClick={props.onClick} />
				)}
			</div>
		);

	default:
		return (
			<div>Loading...</div>
		);
	}
};
