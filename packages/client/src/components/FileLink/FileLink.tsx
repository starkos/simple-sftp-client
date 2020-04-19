import * as React from 'react';

import { SftpFile } from '../../models/sftp';

interface FileLinkProps {
	file: SftpFile;
	onClick: Function;
}

export const FileLink = (props: FileLinkProps) => {
	const onClick = () => {
		props.onClick(props.file);
	};

	return (
		<div>
			<a href="#" onClick={onClick}>{props.file.name}</a>
		</div>
	);
};
