//the page users will see when they need to sign up
import React, { useState } from 'react';
//some chackra components
import {
	Button,
	FormControl,
	FormLabel,
	Heading,
} from '@chakra-ui/react';
import Auth from '../utils/auth';
import DividerLine from '../components/DividerLine';
import { Link } from 'react-router-dom';
import { createUser } from '../utils/API';

const Signup = () => {
	const [formState, setFormState] = useState({ name: '', password: '' });
	const [errorMsg, setErrorMsg] = useState(null);
	console.log('errorMsg:', errorMsg);

	const handleSubmit = async event => {
		event.preventDefault();

		try {
			const response = await createUser(formState);
			console.log('response:', response);

			if (!response.ok) {
				setErrorMsg('There was an error when trying to sign up.');
				throw new Error('There was an error when trying to sign up.');
			}

			const { token } = await response.json();
			Auth.login(token);
		} catch (err) {
			console.error(err);
		}
	};

	//update the form's input state
	const handleChange = event => {
		const { name, value } = event.target;

		setFormState({
			...formState,
			[name]: value,
		});
	};

	//a basic form to allow users to signup using a name and password
	return (
		<section className="container">
			<Heading as='h3' my='25px'>
				Don't have an account? Signup here!
			</Heading>
			<form onSubmit={handleSubmit}>
				<FormControl isRequired>
					<FormLabel htmlFor='name'>Your Name:</FormLabel>
					<input
						className='login-input'
						size='lg'
						type='text'
						id='name'
						name='name'
						value={formState.name}
						onChange={handleChange}
					/>


					<DividerLine />

					<FormLabel htmlFor='signupPassword'>Password:</FormLabel>
					<input
						className='login-input'
						size='lg'
						type='password'
						id='signupPassword'
						name='password'
						value={formState.password}
						onChange={handleChange}
					/>

					<div className='error-wrap'>
						<Button marginTop={5} type='submit' colorScheme='green' size='md'>
							Sign Up
						</Button>
						{errorMsg && <span className='error-msg'>{errorMsg}</span>}
					</div>

					<DividerLine />
					<p>Have an account already?</p>
					<Link to='/'>
						<Button marginTop={5} colorScheme='blue' size='md'>
							Login
						</Button>
					</Link>
				</FormControl>
			</form>
		</section>
	);
};

export default Signup;
