// Import necessary libraries and components

import * as React from 'react';
import { toast } from 'react-toastify';

import {
	Box,
	Typography,
	Card,
	Table,
	TableHead,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Paper,
	IconButton,
	Grid,
	Tooltip,
} from '@mui/material';
import { DriveFileRenameOutline } from '@mui/icons-material';
import {
	Button,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
	TextField,
	Dialog,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Add as AddIcon } from '@mui/icons-material';
import { Clear as ClearIcon } from '@mui/icons-material';
import { useFormik } from 'formik';


import { Task, TaskFormValues, TasksProps } from '../../services/utils/interface';
import styles from './todo-list.module.css';
import {
	useTasks,
	useUpsertTask,
} from '../../services/queries-and-mutations/tasks';
import { taskSchema } from '../../Schema';

// Add new task Modal
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialogContent-root': {
		padding: theme.spacing(2),
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(1),
	},
}));

const Tasks: React.FC<TasksProps> = () => {
	// Table
	const { data: rows = [] } = useTasks();
	const upsertTask = useUpsertTask();

	// Add new task modal
	const [open, setOpen] = React.useState<boolean>(false);
	const [submitting, setSubmitting] = React.useState<boolean>(false);
	const [selectedTaskId, setSelectedTaskId] = React.useState<string>('');

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
		formik.resetForm();
		setSelectedTaskId('');
	};

	const formik = useFormik<TaskFormValues>({
		initialValues: {
			title: '',
			description: '',
			completed: '',
			id: '',
		},
		onSubmit: async (data) => {
			setSubmitting(true);
			const taskData = { ...data, completed: data.completed === 'true' };
			if (selectedTaskId) {
				data['id'] = selectedTaskId;
			}

			try {
				await upsertTask.mutateAsync(taskData);
				toast(`Task ${selectedTaskId ? 'updated' : 'added'} successfully`, {
					type: 'success',
				});
				setOpen(false);
				formik.resetForm();
				setSelectedTaskId('');
			} catch (error) {
				toast(
					`Failed to ${
						selectedTaskId ? 'update' : 'add'
					} task, checkout internet connection`,
					{
						type: 'error',
					}
				);
			} finally {
				setSubmitting(false);
			}
		},
		validationSchema: taskSchema
	});

	const editTask = (selectedTask: Task) => {
		setSelectedTaskId(selectedTask.id || '');
		formik.setValues({
			title: selectedTask.title,
			description: selectedTask.description,
			completed: selectedTask.completed.toString(),
			id: selectedTask.id || '',
		});
		setOpen(true);
	};

	return (
		<>
			<Card
				sx={{
					boxShadow: 'none',
					borderRadius: '10px',
					p: '25px 20px 15px',
					mb: '15px',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						borderBottom: '1px solid #EEF0F7',
						paddingBottom: '10px',
						mb: '20px',
					}}
					className='for-dark-bottom-border'
				>
					<Typography
						component='h3'
						sx={{
							fontSize: 18,
							fontWeight: 500,
						}}
					>
						Task List
					</Typography>

					<Button
						onClick={handleClickOpen}
						variant='contained'
						sx={{
							textTransform: 'capitalize',
							borderRadius: '8px',
							fontWeight: '500',
							fontSize: '13px',
							padding: '12px 20px',
							color: '#fff !important',
						}}
					>
						<AddIcon
							sx={{ position: 'relative', top: '-1px' }}
							className='mr-5px'
						/>{' '}
						Add New Task
					</Button>
				</Box>

				{rows?.length > 0 ? (
					<TableContainer
						component={Paper}
						sx={{
							boxShadow: 'none',
						}}
					>
						<Table
							sx={{ minWidth: 900 }}
							aria-label='custom pagination table'
							className='dark-table'
						>
							<TableHead sx={{ background: '#F7FAFF' }}>
								<TableRow>
									<TableCell
										sx={{
											borderBottom: '1px solid #F7FAFF',
											fontSize: '13.5px',
										}}
									>
										Name
									</TableCell>

									<TableCell
										align='center'
										sx={{
											borderBottom: '1px solid #F7FAFF',
											fontSize: '13.5px',
										}}
									>
										Description
									</TableCell>

									<TableCell
										align='center'
										sx={{
											borderBottom: '1px solid #F7FAFF',
											fontSize: '13.5px',
										}}
									>
										Status
									</TableCell>

									<TableCell
										align='right'
										sx={{
											borderBottom: '1px solid #F7FAFF',
											fontSize: '13.5px',
										}}
									>
										Action
									</TableCell>
								</TableRow>
							</TableHead>

							<TableBody>
								{rows.map((row) => (
									<TableRow key={row.id}>
										<TableCell
											style={{
												borderBottom: '1px solid #F7FAFF',
												paddingTop: '13px',
												paddingBottom: '13px',
												display: 'flex',
												alignItems: 'center',
											}}
										>
											<Box
												sx={{
													display: 'flex',
													alignItems: 'center',
												}}
												className='ml-10px'
											>
												<Box>
													<Typography
														component='h4'
														sx={{
															fontWeight: '500',
															fontSize: '13.5px',
														}}
														className='ml-10px'
													>
														{row.title}
													</Typography>
												</Box>
											</Box>
										</TableCell>

										<TableCell
											align='center'
											style={{
												borderBottom: '1px solid #F7FAFF',
												fontSize: '13px',
												paddingTop: '13px',
												paddingBottom: '13px',
											}}
										>
											{row.description}
										</TableCell>

										<TableCell
											align='center'
											style={{
												borderBottom: '1px solid #F7FAFF',
												fontSize: '13px',
												paddingTop: '13px',
												paddingBottom: '13px',
												color: row.completed ? 'green' : 'red',
											}}
										>
											{row.completed ? 'Completed' : 'Incomplete'}
										</TableCell>

										<TableCell
											align='right'
											sx={{ borderBottom: '1px solid #F7FAFF' }}
										>
											<Box
												sx={{
													display: 'inline-block',
												}}
											>
												<Tooltip
													title='Rename'
													placement='top'
												>
													<IconButton
														aria-label='rename'
														size='small'
														color='primary'
														className='primary'
														onClick={() => editTask(row)}
													>
														<DriveFileRenameOutline fontSize='inherit' />
													</IconButton>
												</Tooltip>
											</Box>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				) : (
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							height: '300px',
							alignItems: 'center',
							fontSize: '20px',
						}}
					>
						No Tasks Found
					</Box>
				)}
			</Card>

			{/* Add new task modal */}
			<BootstrapDialog
				onClose={handleClose}
				aria-labelledby='customized-dialog-title'
				open={open}
			>
				<Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							background: '#EDEFF5',
							borderRadius: '8px',
							padding: '20px 20px',
						}}
						className='bg-black'
					>
						<Typography
							id='modal-modal-title'
							variant='h6'
							component='h2'
							sx={{
								fontWeight: '500',
								fontSize: '18px',
							}}
						>
							{selectedTaskId ? 'Update' : 'Add New'} Task
						</Typography>

						<IconButton
							aria-label='remove'
							size='small'
							onClick={handleClose}
						>
							<ClearIcon />
						</IconButton>
					</Box>

					<Box
						component='form'
						noValidate
						onSubmit={formik.handleSubmit}
					>
						<Box
							sx={{
								background: '#fff',
								padding: '20px 20px',
								borderRadius: '8px',
							}}
							className='dark-BG-101010'
						>
							<Grid
								container
								alignItems='center'
								spacing={2}
							>
								<Grid
									item
									xs={12}
									md={12}
									lg={6}
								>
									<Typography
										component='h5'
										sx={{
											fontWeight: '500',
											fontSize: '14px',
											mb: '12px',
										}}
									>
										Title
									</Typography>

									<TextField
										name='title'
										fullWidth
										label='title'
										onBlur={formik.handleBlur}
										onChange={formik.handleChange}
										value={formik.values.title}
										InputProps={{
											style: { borderRadius: 8 },
										}}
									/>
									{formik.touched.title && formik.errors.title && (
										<span className={styles.errorMessage}>
											{formik.errors.title}
										</span>
									)}
								</Grid>

								<Grid
									item
									xs={12}
									md={12}
									lg={6}
								>
									<Typography
										component='h5'
										sx={{
											fontWeight: '500',
											fontSize: '14px',
											mb: '12px',
										}}
									>
										Status
									</Typography>

									<FormControl fullWidth>
										<InputLabel id='completed'>Select</InputLabel>
										<Select
											labelId='completed'
											id='completed'
											value={formik.values.completed}
											name='completed'
											onBlur={formik.handleBlur}
											label='Status'
											onChange={formik.handleChange}
											sx={{ borderRadius: 2 }}
										>
											<MenuItem
												value='true'
												key='completed'
											>
												Completed
											</MenuItem>
											<MenuItem
												value='false'
												key='incomplete'
											>
												Incomplete
											</MenuItem>
										</Select>
										{formik.touched.completed && formik.errors.completed && (
											<span className={styles.errorMessage}>
												{formik.errors.completed}
											</span>
										)}
									</FormControl>
								</Grid>

								<Grid
									item
									xs={12}
									md={12}
									lg={12}
								>
									<Typography
										component='h5'
										sx={{
											fontWeight: '500',
											fontSize: '14px',
											mb: '12px',
										}}
									>
										Description
									</Typography>

									<TextField
										name='description'
										fullWidth
										label='Description'
										onBlur={formik.handleBlur}
										onChange={formik.handleChange}
										value={formik.values.description}
										InputProps={{
											style: { borderRadius: 8 },
										}}
									/>
									{formik.touched.description && formik.errors.description && (
										<span className={styles.errorMessage}>
											{formik.errors.description}
										</span>
									)}
								</Grid>

								<Grid
									item
									xs={12}
									textAlign='end'
								>
									<Button
										type='submit'
										disabled={submitting}
										variant='contained'
										sx={{
											mt: 1,
											textTransform: 'capitalize',
											borderRadius: '8px',
											fontWeight: '500',
											fontSize: '13px',
											padding: '12px 20px',
											color: '#fff !important',
										}}
									>
										<AddIcon
											sx={{
												position: 'relative',
												top: '-2px',
											}}
											className='mr-5px'
										/>{' '}
										{selectedTaskId ? 'Update' : 'Add New'} Task
									</Button>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Box>
			</BootstrapDialog>
		</>
	);
}

export default Tasks;
