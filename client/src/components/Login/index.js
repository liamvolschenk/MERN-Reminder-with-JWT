//this is component allows users to log in to their profiles and view their specific to-do's
import React, { useState } from 'react';
//importing some chakra components
import {
	Button,
	FormControl,
	FormLabel,
	Heading,
} from '@chakra-ui/react';
import Auth from '../../utils/auth';
import DividerLine from '../DividerLine';
import { Link } from 'react-router-dom';
import TodoList from '../../pages/TodoList';
import { loginUser } from '../../utils/API';

const Login = () => {
	const [formState, setFormState] = useState({ name: '', password: '' });
	const [errorMsg, setErrorMsg] = useState(null);

	const handleSubmit = async event => {
		event.preventDefault();

		try {
			const response = await loginUser(formState);

			if (!response.ok) {
				setErrorMsg('Incorrect Name or Password.');
				throw new Error('Incorrect Name or Password.');
			}

			const { token } = await response.json();
			Auth.login(token);
			location.replace('/todos');
		} catch (err) {
			console.error(err);
		}
	};

	// Update the form's input state
	const handleChange = event => {
		const { name, value } = event.target;

		setFormState({
			...formState,
			[name]: value,
		});
	};

	//a basic form that allows users to enter their details and login to their profiles
	return (
		<div className="container">
			{Auth.loggedIn() ? (
				<TodoList />
			) : (
				<section>
					<Heading as='h3' my='25px'>
						Login here!
					</Heading>
					<form onSubmit={handleSubmit}>
						<FormControl isRequired>
							<FormLabel htmlFor='name'>Username:</FormLabel>
							<input
								className='login-input'
								size='lg'
								name='name'
								type='text'
								id='name'
								value={formState.name}
								onChange={handleChange}
							/>

							<DividerLine />

							<FormLabel htmlFor='loginPassword'>Password:</FormLabel>
							<input
								className='login-input'
								size='lg'
								name='password'
								type='password'
								id='loginPassword'
								value={formState.password}
								onChange={handleChange}
							/>

							<div className='error-wrap'>
								<Button marginTop={5} type='submit' colorScheme='blue' size='md'>
									Login
								</Button>
								{errorMsg && <span className='error-msg'>{errorMsg}</span>}
							</div>
						</FormControl>
					</form>

					<DividerLine />

					<div>
						<h4>New Here?</h4>
						<Link to='/signup'>
							<Button marginTop={5} colorScheme='green' size='md'>
								Sign up
							</Button>
						</Link>
					</div>
				</section>
			)}
		</div>
	);
};

export default Login;
