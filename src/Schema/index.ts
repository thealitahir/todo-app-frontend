import * as Yup from "yup";

export const loginSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string().min(8).required('Password is required'),
})

export const signUpSchema = Yup.object({
    username: Yup.string().required('User name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string().min(8).required('Password is required'),
    confirm_password: Yup.string().min(8)
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Please re-type password'),
})

export const taskSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    completed: Yup.boolean().required('Status is required'),
})