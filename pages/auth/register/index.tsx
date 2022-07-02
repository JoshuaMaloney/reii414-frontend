import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import AuthContext from '../../../context/authContext/authContext';

const schema = yup.object({
    username: yup.string().required('Required'),
    email: yup.string().email('Please enter valid email').required('Required'),
    phoneNumber: yup.string().required('Required'),
    password: yup
        .string()
        .min(6, 'Min 6 characters')
        .max(15, 'Max 15 characters')
        .required('Required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')])
        .required('Required'),
});

const RegisterPage = () => {
    const router = useRouter();
    const authCtx = useContext(AuthContext);

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            try {
                await authCtx.register({
                    email: values.email,
                    username: values.username,
                    password: values.password,
                    phoneNumber: values.phoneNumber,
                });

                router.push('/');
            } catch (error) {
                return;
            }
        },
    });

    return (
        <Box sx={{ display: 'grid', placeItems: 'center', paddingY: '3rem' }}>
            <Paper
                sx={{
                    padding: '2rem',
                    width: '500px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                }}
            >
                <Typography variant="h3" sx={{ marginBottom: '1rem' }}>
                    Register
                </Typography>

                <TextField
                    label="User name"
                    value={formik.values.username}
                    onChange={formik.handleChange('username')}
                    onBlur={formik.handleBlur('username')}
                    error={
                        !!(formik.touched.username && formik.errors.username)
                    }
                    helperText={
                        formik.touched.username &&
                        formik.errors.username &&
                        formik.errors.username
                    }
                />

                <TextField
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange('email')}
                    onBlur={formik.handleBlur('email')}
                    error={!!(formik.touched.email && formik.errors.email)}
                    helperText={
                        formik.touched.email &&
                        formik.errors.email &&
                        formik.errors.email
                    }
                />

                <TextField
                    label="Phone number"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange('phoneNumber')}
                    onBlur={formik.handleBlur('phoneNumber')}
                    error={
                        !!(
                            formik.touched.phoneNumber &&
                            formik.errors.phoneNumber
                        )
                    }
                    helperText={
                        formik.touched.phoneNumber &&
                        formik.errors.phoneNumber &&
                        formik.errors.phoneNumber
                    }
                />

                <TextField
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange('password')}
                    onBlur={formik.handleBlur('password')}
                    error={
                        !!(formik.touched.password && formik.errors.password)
                    }
                    helperText={
                        formik.touched.password &&
                        formik.errors.password &&
                        formik.errors.password
                    }
                />

                <TextField
                    label="Confirm password"
                    type="password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange('confirmPassword')}
                    onBlur={formik.handleBlur('confirmPassword')}
                    error={
                        !!(
                            formik.touched.confirmPassword &&
                            formik.errors.confirmPassword
                        )
                    }
                    helperText={
                        formik.touched.confirmPassword &&
                        formik.errors.confirmPassword &&
                        formik.errors.confirmPassword
                    }
                />

                <Button
                    variant="contained"
                    onClick={() => formik.handleSubmit()}
                    disabled={
                        !formik.isValid ||
                        formik.isSubmitting ||
                        (!formik.dirty && formik.isValid)
                    }
                >
                    Register
                </Button>

                <Button onClick={() => router.push('/auth/login')}>
                    Already have an account? Login Here
                </Button>
            </Paper>
        </Box>
    );
};

export default RegisterPage;
