// Import necessary libraries and components
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';


import { Box } from '@mui/system';
import { Typography, Grid, TextField, Button } from '@mui/material';
import { useFormik, FormikHelpers } from 'formik';

import {
	LoginDTO,
	LoginFormValues,
} from '../../services/utils/interface';
import { useLogin } from '../../services/queries-and-mutations/auth';
import styles from './login.module.css';
import { loginSchema } from '../../Schema';

// Login component
const Login: React.FC = () => {
	const login = useLogin();
	const [loading, setLoading] = useState<boolean>(false);

	// Formik setup for handling form state, validation, and submission
	const formik = useFormik<LoginFormValues>({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: async (
			data: LoginDTO,
			{ setSubmitting }: FormikHelpers<LoginFormValues>
		) => {
			setLoading(true);
			localStorage.clear();
			try {
				await login.mutateAsync(data);
				toast('Logged in successfully', { type: 'success' });
			} catch (error: any) {
				toast(error?.response?.data?.message, { type: 'error' });
			} finally {
				setLoading(false);
				setSubmitting(false);
			}
		},
		validationSchema: loginSchema
	});

	return (
		<div className='authenticationBox'>
			<Box
				component='main'
				sx={{
					maxWidth: '510px',
					ml: 'auto',
					mr: 'auto',
					padding: '50px 0 100px',
				}}
			>
				<Grid
					item
					xs={12}
				>
					<Box>
						<Typography
							variant='h1'
							fontSize='28px'
							fontWeight='700'
							mb='5px'
						>
							Log In
						</Typography>
						<Typography
							fontSize='15px'
							mb='30px'
						>
							Don't have an account?{' '}
							<Link
								to='/signup'
								className='primaryColor text-decoration-none'
							>
								Sign up
							</Link>
						</Typography>

						<Box
							component='form'
							noValidate
							onSubmit={formik.handleSubmit}
						>
							<Box
								sx={{
									background: '#fff',
									padding: '30px 20px',
									borderRadius: '10px',
									mb: '20px',
									mt: 5,
								}}
								className='bg-black'
							>
								<Grid
									container
									alignItems='center'
									spacing={2}
								>
									<Grid
										item
										xs={12}
									>
										<Typography
											component='label'
											sx={{
												fontWeight: '500',
												fontSize: '14px',
												mb: '10px',
												display: 'block',
											}}
										>
											Email
										</Typography>

										<TextField
											fullWidth
											label='Email Address'
											name='email'
											onBlur={formik.handleBlur}
											onChange={formik.handleChange}
											value={formik.values.email}
											autoComplete='email'
											InputProps={{
												style: { borderRadius: 8 },
											}}
										/>
										{formik.touched.email && formik.errors.email && (
											<span className={styles.errorMessage}>
												{formik.errors.email}
											</span>
										)}
									</Grid>

									<Grid
										item
										xs={12}
									>
										<Typography
											component='label'
											sx={{
												fontWeight: '500',
												fontSize: '14px',
												mb: '10px',
												display: 'block',
											}}
										>
											Password
										</Typography>

										<TextField
											fullWidth
											name='password'
											label='Password'
											type='password'
											onBlur={formik.handleBlur}
											onChange={formik.handleChange}
											value={formik.values.password}
											autoComplete='new-password'
											InputProps={{
												style: { borderRadius: 8 },
											}}
										/>
										{formik.touched.password && formik.errors.password && (
											<span className={styles.errorMessage}>
												{formik.errors.password}
											</span>
										)}
									</Grid>
								</Grid>
							</Box>

							<Button
								type='submit'
								fullWidth
								variant='contained'
								disabled={loading}
								sx={{
									mt: 2,
									textTransform: 'capitalize',
									borderRadius: '8px',
									fontWeight: '500',
									fontSize: '16px',
									padding: '12px 10px',
									color: '#fff !important',
								}}
							>
								{loading ? (
									<ThreeDots
										height='28'
										width='40'
										radius='9'
										color='#FFFFFF'
										ariaLabel='three-dots-loading'
										visible
									/>
								) : (
									'Log In'
								)}
							</Button>
						</Box>
					</Box>
				</Grid>
			</Box>
		</div>
	);
};

export default Login;
