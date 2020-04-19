import * as React from 'react';

interface ErrorMessageProps {
	error: any;
}

export const ErrorMessage  = (props: ErrorMessageProps) => {
	const e = props.error;

	if (e === null)	{
		return (null);
	}

	let message: string;

	if (e instanceof Error) {
		message = e.message;
	} else {
		message = e.toString();
	}

	return (
		<div className="error">{message}</div>
	);
};
