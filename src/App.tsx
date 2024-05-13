import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './components/login/login';
import Signup from './components/signup/signup';
import ToDoList from './components/todo-list/todo-list';
import Layout from './components/layout/layout';

function App() {
	const queryClient = new QueryClient();

	return (
		<div className='App'>
			<QueryClientProvider client={queryClient}>
			<Layout>
				<BrowserRouter>
					<Routes><Route
								path='/'
								element={<Login />}
							/>
							<Route
								path='signup'
								element={<Signup />}
							/>
							<Route
								path='todo-list'
								element={<ToDoList />}
							/>
					</Routes>
				</BrowserRouter>
				</Layout>
				<ToastContainer />
			</QueryClientProvider>
		</div>
	);
}

export default App;
