import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './components/login/login';
import Signup from './components/signup/signup';
import ToDoList from './components/todo-list/todo-list';
import Layout from './components/layout/layout';
import { PrivateRoutes, PublicRoutes } from './routes';
import { RouteConfig } from './routes/Interface/interface';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
	const queryClient = new QueryClient();
	const token = localStorage.getItem("token");

	return (
		<ErrorBoundary>
		<div className='App'>
			<QueryClientProvider client={queryClient}>
				<Layout>
					<BrowserRouter>
						<Routes>
							{!token
								? PublicRoutes.map(
									({ component, path }: RouteConfig, index: number) => (
										<Route key={index} path={path} element={component} />
									)
								)
								: PrivateRoutes.map(
									({ component, path }: RouteConfig, index: number) => (
										<Route key={index} path={path} element={component} />
									)
								)}
						</Routes>
					</BrowserRouter>
				</Layout>
				<ToastContainer />
			</QueryClientProvider>
		</div>
		</ErrorBoundary>
	);
}

export default App;
