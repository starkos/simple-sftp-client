import * as path from 'path';
import * as React from 'react';

interface FolderNavigatorProps {
	cwd: string;
	onClick: Function;
}

export const FolderNavigator  = (props: FolderNavigatorProps) => {
	const onClick = () => {
		props.onClick(path.dirname(props.cwd));
	};

	return (
		<div>
			{props.cwd}
			[<a href="#" onClick={onClick}>..</a>]
		</div>
	);
};
