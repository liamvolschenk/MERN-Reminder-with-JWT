//a simple dividing line using a chakra component
import React from 'react';
import { Center, Divider } from '@chakra-ui/react';

const DividerLine = () => {
	return (
		<Center height='50px'>
			<Divider orientation='horizontal' />
		</Center>
	);
};

export default DividerLine;
