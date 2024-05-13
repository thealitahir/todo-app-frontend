import { ReactNode } from 'react';
import { Box, Button } from '@mui/material';

const Layout = ({ children }: { children: ReactNode }) => {
	const username = localStorage.getItem('username');
	const token = localStorage.getItem('token')

	const handleLogout = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('username')
		window.location.href = '/'
	};
	return (
		<Box>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
				<Box>Welcome {username}</Box>
				{token && <Button
					variant='outlined'
					size='small'
					onClick={handleLogout}
				>
					Logout
				</Button>}
			</Box>
			{children}
		</Box>
	);
};

export default Layout;
