import * as React from 'react';
import { render } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

import { Hello } from './Hello';

test('displays compiler and framework', async () => {
	const { container } = render(<Hello compiler="TypeScript" framework="React" />);
	expect(container).toHaveTextContent('Hello from TypeScript and React!');
});
