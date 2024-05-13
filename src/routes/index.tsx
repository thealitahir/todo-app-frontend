import Login from "../components/login/login";
import Signup from "../components/signup/signup";
import TodoList from "../components/todo-list/todo-list";

export const PublicRoutes = [
	{
		path: "/",
		component: <Login />,
	},
	{
		path: "/signup",
		component: <Signup />,
	}
];

export const PrivateRoutes = [
	{
		path: "/todo-list",
		component: <TodoList />,
	}
];
