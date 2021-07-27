import React, { useState } from 'react';
import Auth from '../utils/auth';
import { saveTodo } from '../utils/API';

//the page users will see when creating a new to-do item
const CreateTodo = () => {
	const [todoState, setTodoState] = useState({
		title: '',
		description: '',
		priority: '',
		completed: false,
		userId: '',
	});

	//get the current user's ID with the getProfile function from Auth
	const userId = Auth.getProfile().data._id;

	//function to update the current todo state
	const handleChange = event => {
		const { name, value } = event.target;
		setTodoState({
			...todoState,
			userId: userId,
			[name]: value,
		});
	};

	//submit the form data and execute the saveTodo function, then reset the todo state
	const handleSubmit = async event => {
		event.preventDefault();

		//get the logged in user's token
		const token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			return false;
		}

		try {
			const response = await saveTodo(todoState, token);

			if (!response.ok) {
				throw new Error('There was an error.');
			}

			location.assign('/todos');
		} catch (err) {
			console.error(err);
		}

		setTodoState({
			title: '',
			description: '',
			priority: '',
			completed: false,
			userId: userId,
		});
	};

	//laying everything out in a basic form format, to allow users to create reminders with a description and priority level
	return (
		<main className="container">
			<h2>Create New Reminder</h2>
			<section>
				<form onSubmit={handleSubmit}>
					<div className='form-group'>
						<label htmlFor='title'>Title:</label>
						<input
							type='text'
							className='form-control'
							id='title'
							name='title'
							value={todoState.title}
							onChange={handleChange}
						/>
					</div>

					<div className='form-group'>
						<label htmlFor='description'>Description:</label>
						<input
							type='text'
							className='form-control'
							id='description'
							name='description'
							value={todoState.description}
							onChange={handleChange}
						/>
					</div>

					<div className='form-group'>
						<label htmlFor='priority'>Priority:</label>
						<br />
						<div className='form-check form-check-inline'>
							<input
								type='radio'
								className='form-check-input priority'
								id='priority-low'
								name='priority'
								value='low'
								onChange={handleChange}
							/>
							<label className='form-check-label' htmlFor='priority-low'>
								Low
							</label>
						</div>
						<div className='form-check form-check-inline'>
							<input
								type='radio'
								className='form-check-input priority'
								id='priority-medium'
								name='priority'
								value='medium'
								onChange={handleChange}
							/>
							<label className='form-check-label' htmlFor='priority-medium'>
								Medium
							</label>
						</div>
						<div className='form-check form-check-inline'>
							<input
								type='radio'
								className='form-check-input priority'
								id='priority-high'
								name='priority'
								value='high'
								onChange={handleChange}
							/>
							<label className='form-check-label' htmlFor='priority-high'>
								High
							</label>
						</div>
					</div>

					<div className='form-group'>
						<button type='submit' className='btn btn-info'>
							Save Reminder
						</button>
					</div>
				</form>
			</section>
		</main>
	);
};

export default CreateTodo;
