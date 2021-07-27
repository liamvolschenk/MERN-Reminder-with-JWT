import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React from 'react';

//a simple 'not found' page
const NotFound = () => {
	return (
		<main>
			<h2>404 PAGE NOT FOUND</h2>
			<Link to='/'>
				<Button margin={3} colorScheme='teal' size='md'>
					Go Back Home
				</Button>
			</Link>
		</main>
	);
};

export default NotFound;
