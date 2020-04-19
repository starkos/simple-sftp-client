import * as React from 'react';

import { SftpFile } from '../../models/sftp';

interface FileListProps
{
	files: SftpFile[];
}

export const FileList = (props: FileListProps) =>
	<div>
		{props.files.map(file =>
			<div key={file.name}>{file.name}</div>
		)}
	</div>;
