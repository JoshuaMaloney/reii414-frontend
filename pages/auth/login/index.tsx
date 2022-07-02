import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import AuthContext from '../../../context/authContext/authContext';

const schema = yup.object({
    email: yup.string().email('Please enter valid email').required('Required'),
    password: yup
        .string()
        .min(6, 'Min 6 characters')
        .max(15, 'Max 15 characters')
        .required('Required'),
});

const LoginPage = () => {
    const router = useRouter();
    const authContext = useContext(AuthContext);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            try {
                await authContext.login({
                    email: values.email,
                    password: values.password,
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
                    Login
                </Typography>

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

                <Button
                    variant="contained"
                    disabled={
                        !formik.isValid ||
                        formik.isSubmitting ||
                        (!formik.dirty && formik.isValid)
                    }
                    onClick={() => formik.handleSubmit()}
                >
                    Login
                </Button>

                <Button onClick={() => router.push('/auth/register')}>
                    Don&apos;t have an account yet? Register Here
                </Button>
            </Paper>
        </Box>
    );
};

export default LoginPage;
