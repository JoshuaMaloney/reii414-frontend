import {
    Box,
    Button,
    Container,
    MenuItem,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import * as yup from 'yup';
import AuthContext from '../../../context/authContext/authContext';
import keys from '../../../config/config';

const CONDITIONS = ['poor', 'good', 'great', 'excellent'];
const CATEGORIES = [
    'sport training',
    'computer and electronics',
    'books and courses',
    'gaming',
];

const schema = yup.object({
    title: yup.string().required('Required!'),
    description: yup.string().required('Required!'),
    file: yup.mixed().required('Required!'),
    condition: yup
        .string()
        .oneOf([...CONDITIONS], 'Please select valid condition')
        .required('Required'),
    price: yup.number().required('Required!'),
    category: yup
        .string()
        .oneOf([...CATEGORIES], 'Please select valid category')
        .required('Required'),
});

interface FormFieldInterface {
    title: string;
    description: string;
    price: number;
    file: null | any;
    condition: string;
    category: string;
}

const NewAdvertPage = () => {
    const authContext = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!authContext.isLoggedIn) {
            router.push('/auth/login');
        }
    }, [authContext.isLoggedIn, router]);

    const formik = useFormik<FormFieldInterface>({
        initialValues: {
            title: '',
            description: '',
            price: 0,
            file: null,
            condition: '',
            category: '',
        },
        validationSchema: schema,
        onSubmit: uploadPost,
    });

    async function uploadPost(
        values: FormFieldInterface,
        formikHelpers: FormikHelpers<FormFieldInterface>
    ) {
        formik.setSubmitting(true);

        try {
            const formData = new FormData();

            formData.append(
                'data',
                JSON.stringify({
                    title: values.title,
                    description: values.description,
                    price: values.price,
                    condition: values.condition,
                    category: values.category,
                })
            );

            formData.append('files.images', values.file);

            const res = await fetch(`${keys.API_URL}/api/adverts`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${authContext.token}`,
                },
                body: formData,
            });

            if (!res.ok) {
                throw Error('Something went wrong');
            }

            const postData = await res.json();

            formik.resetForm();
            router.push(`/advert/${postData.data.id}`);
        } catch (error) {
            console.log(error);
        } finally {
            formik.setSubmitting(false);
        }
    }

    return (
        <Container>
            <Paper
                sx={{
                    maxWidth: '550px',
                    padding: '2rem',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                }}
            >
                <Typography variant="h3">New Advert</Typography>

                <TextField
                    label="Title"
                    value={formik.values.title}
                    onChange={formik.handleChange('title')}
                    onBlur={formik.handleBlur('title')}
                    error={!!(formik.touched.title && formik.errors.title)}
                    helperText={
                        formik.touched.title &&
                        formik.errors.title &&
                        formik.errors.title
                    }
                />

                <TextField
                    label="Description"
                    value={formik.values.description}
                    onChange={formik.handleChange('description')}
                    onBlur={formik.handleBlur('description')}
                    error={
                        !!(
                            formik.touched.description &&
                            formik.errors.description
                        )
                    }
                    helperText={
                        formik.touched.description &&
                        formik.errors.description &&
                        formik.errors.description
                    }
                />

                <TextField
                    label="Price"
                    value={formik.values.price}
                    type="number"
                    onChange={formik.handleChange('price')}
                    onBlur={formik.handleBlur('price')}
                    error={!!(formik.touched.price && formik.errors.price)}
                    helperText={
                        formik.touched.price &&
                        formik.errors.price &&
                        formik.errors.price
                    }
                />

                <input
                    type="file"
                    onBlur={formik.handleBlur('file')}
                    onChange={(e) =>
                        formik.setFieldValue('file', e.target.files![0])
                    }
                />

                <TextField
                    select
                    label="Condition"
                    value={formik.values.condition}
                    onChange={(e) =>
                        formik.setFieldValue('condition', e.target.value)
                    }
                    onBlur={formik.handleBlur('condition')}
                    error={
                        !!(formik.touched.condition && formik.errors.condition)
                    }
                    helperText={
                        formik.touched.condition &&
                        formik.errors.condition &&
                        formik.errors.condition
                    }
                >
                    {CONDITIONS.map((el) => (
                        <MenuItem key={el} value={el}>
                            {el}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    select
                    label="Category"
                    value={formik.values.category}
                    onChange={formik.handleChange('category')}
                    onBlur={formik.handleBlur('category')}
                    error={
                        !!(formik.touched.category && formik.errors.category)
                    }
                    helperText={
                        formik.touched.category &&
                        formik.errors.category &&
                        formik.errors.category
                    }
                >
                    {CATEGORIES.map((el) => (
                        <MenuItem key={el} value={el}>
                            {el}
                        </MenuItem>
                    ))}
                </TextField>

                <Button
                    disabled={
                        (formik.isValid && !formik.dirty) ||
                        formik.isSubmitting ||
                        !formik.isValid
                    }
                    variant="contained"
                    onClick={() => formik.handleSubmit()}
                >
                    Create Advert
                </Button>
            </Paper>
        </Container>
    );
};

export default NewAdvertPage;
