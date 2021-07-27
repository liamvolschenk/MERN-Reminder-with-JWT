//a basic nav bar using react router dom to allow users to navigate the application with ease
import { Link } from 'react-router-dom';
import React from 'react';
import { Heading } from '@chakra-ui/react';
import Auth from '../../utils/auth';
import logo from '../images/icon.png'

const Nav = ({ currentPage, setCurrentPage }) => {
	const logout = event => {
		event.preventDefault();
		Auth.logout();
	};

	return (
		<nav className='nav'>
			<div className='navbar-brand'>
				<img className="logo" src={logo} alt="logo" />
			</div>
			<Link to='/' className='navbar-brand '>
				<Heading className='nav-title' as='h4' onClick={() => setCurrentPage('/todos')}>
					To-Do List
				</Heading>
			</Link>
			<ul className='navbar-items'>
				{Auth.loggedIn() ? (
					<>
						<li className={currentPage === '/todos' ? 'nav-item active' : 'nav-item'}>
							<Link to='/todos'>
								<h4 className='nav-item' onClick={() => setCurrentPage('/todos')} colorScheme={'telegram'}>
									All Reminders
								</h4>
							</Link>
						</li>
						<li className={currentPage === '/create' ? 'nav-item active' : 'nav-item'}>
							<Link to='/create'>
								<h4 className='nav-item' onClick={() => setCurrentPage('/create')}>
									Create Reminder
								</h4>
							</Link>
						</li>
						<li className='nav-item'>
							<h3 className='logout' onClick={logout} colorScheme={'purple'}>
								Logout
							</h3>
						</li>
					</>
				) : (
					<>
						<li>
							<Link to='/signup' className='nav-item'>
								<h4 className="nav-log signup">Sign up</h4>
							</Link>
						</li>
						<li>
							<Link to='/' className='nav-item'>
								<h4 className="nav-log">Login</h4>
							</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default Nav;
