import * as React from 'react';

interface FolderNavigatorProps {
	cwd: string;
}

export const FolderNavigator  = (props: FolderNavigatorProps) =>
	<div>{props.cwd}</div>;
