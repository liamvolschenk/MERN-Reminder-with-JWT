//thisis where a user will be able to edit/update a reminder that they have created, the functionality is very similar to the create to do page
import React, { useEffect, useState } from 'react';
//importing some Chakra components
import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Radio,
	RadioGroup,
} from '@chakra-ui/react';
//importing all the other necessary modules
import { editTodo, getTodoItem } from '../utils/API';
import Auth from '../utils/auth';
import DividerLine from '../components/DividerLine';
import { GET_ONE_TODO } from '../utils/actions';
import { useParams } from 'react-router-dom';
import { useTodoContext } from '../utils/TodoState';

const EditTodo = () => {
	//get the Todo ID from the parameters
	const { id: todoID } = useParams();

	const [todoForm, setTodoForm] = useState({
		title: '',
		description: '',
		priority: '',
		completed: false,
		userId: '',
	});

	const [state, dispatch] = useTodoContext();

	const handleSubmit = async event => {
		event.preventDefault();
		const token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			return false;
		}

		try {
			const response = await editTodo(todoForm, todoID, token);
			if (!response) {
				throw new Error('There was an error.');
			}
			location.assign('/todos');
		} catch (err) {
			console.error(err);
		}
	};

	const handleChange = event => {
		const { name, value } = event.target;
		setTodoForm({
			...todoForm,
			[name]: value,
		});
	};

	useEffect(() => {
		const getTodo = async () => {
			try {
				const token = Auth.loggedIn() ? Auth.getToken() : null;
				if (!token) {
					return false;
				}
				const response = await getTodoItem(todoID);
				const todoData = await response.json();

				dispatch({
					type: GET_ONE_TODO,
					payload: todoData,
				});

				setTodoForm({
					title: todoData.title,
					description: todoData.description,
					priority: todoData.priority,
					completed: todoData.completed,
					userId: todoData.userId,
				});
			} catch (err) {
				console.error(err);
			}
		};
		getTodo();
	}, []);

	//a basic form with all the above functionality which allows a user to edit a specific to-do item
	return (
		<main className="container">
			<h2>Edit Reminder</h2>
			<section>
				<form onSubmit={handleSubmit}>
					<FormControl>
						<FormLabel htmlFor='title'>Title:</FormLabel>
						<input
							type='text'
							className='form-control edit-form'
							id='title'
							name='title'
							value={todoForm.title}
							onChange={handleChange}
						/>
						<DividerLine />
						<FormLabel htmlFor='description'>Description:</FormLabel>
						<input
							type='text'
							className='form-control edit-form'
							id='description'
							name='description'
							value={todoForm.description}
							onChange={handleChange}
						/>
						<DividerLine />

						<FormLabel htmlFor='priority'>Priority:</FormLabel>
						<RadioGroup
							id='priority'
							name='priority'
							onChange={value => setTodoForm({ ...todoForm, priority: value })}
							value={todoForm.priority}
							direction='row'
						>
							<Radio name='priority' padding={4} value='low' colorScheme='teal'>
								Low
							</Radio>
							<Radio name='priority' padding={4} value='medium' colorScheme='teal'>
								Medium
							</Radio>
							<Radio name='priority' padding={4} value='high' colorScheme='teal'>
								High
							</Radio>
						</RadioGroup>
						<Button className="save-button" type='submit' colorScheme='teal' size='lg'>
							Save
						</Button>
						<FormErrorMessage></FormErrorMessage>
					</FormControl>
				</form>
			</section>
		</main>
	);
};

export default EditTodo;
