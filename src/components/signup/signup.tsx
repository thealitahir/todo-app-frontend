// Import necessary libraries and components
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';

import { Typography, Grid, TextField, Button, Box } from '@mui/material';
import { useFormik } from 'formik';

import styles from './signup.module.css';
import { useSignup } from '../../services/queries-and-mutations/auth';
import { SignupFormData } from '../../services/utils/interface';
import { signUpSchema } from '../../Schema';

const Signup = () => {
	const navigate = useNavigate();
	const signup = useSignup();
	const [loading, setLoading] = useState<boolean>(false);

	const formik = useFormik<SignupFormData>({
		initialValues: {
			username: '',
			email: '',
			password: '',
			confirm_password: '',
		},
		validationSchema: signUpSchema,
		onSubmit: async (values) => {
			setLoading(true);
			try {
				await signup.mutateAsync(values);
				toast('Registered successfully', { type: 'success' });
			} catch (error: any) {
				toast(error.response?.data?.message || 'An error occurred', {
					type: 'error',
				});
			} finally {
				setLoading(false);
			}
		},
	});

	return (
		<>
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
								Sign Up
							</Typography>
							<Typography
								fontSize='15px'
								mb='30px'
							>
								Already have an account?{' '}
								<Link
									to='/'
									className='primaryColor text-decoration-none'
								>
									Log in
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
										{['username', 'email', 'password', 'confirm_password'].map(
											(field, index) => (
												<Grid
													item
													xs={12}
													key={index}
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
														{field.replace('_', ' ')}
													</Typography>
													<TextField
														fullWidth
														label={
															field.charAt(0).toUpperCase() +
															field.slice(1).replace('_', ' ')
														}
														type={
															field.includes('password') ? 'password' : 'text'
														}
														name={field}
														onBlur={formik.handleBlur}
														onChange={formik.handleChange}
														autoComplete={field}
														InputProps={{ style: { borderRadius: 8 } }}
													/>
													{formik.touched[field as keyof SignupFormData] &&
														formik.errors[field as keyof SignupFormData] && (
															<span className={styles.errorMessage}>
																{formik.errors[field as keyof SignupFormData]}
															</span>
														)}
												</Grid>
											)
										)}
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
										'Sign Up'
									)}
								</Button>
							</Box>
						</Box>
					</Grid>
				</Box>
			</div>
		</>
	);
};

export default Signup;
