import {
    Alert,
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import qs from 'qs';
import React, { useContext, useEffect, useState } from 'react';
import ProductCard from '../../components/ui/ProductCard';
import AuthContext from '../../context/authContext/authContext';

const ProfilePage = () => {
    const [adverts, setAdverts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const { isLoggedIn, token, user } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/');
        }

        return () => {};
    }, [isLoggedIn, router]);

    useEffect(() => {
        if (!isLoggedIn || !token || !user) {
            return;
        }

        setLoading(true);

        const query = qs.stringify({
            filters: {
                creator: {
                    email: {
                        $eq: user.email,
                    },
                },
            },
            populate: '*',
        });

        fetch('http://localhost:1337/api/adverts?' + query, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw Error('Something went wrong');
                }

                return res.json();
            })
            .then((data) => {
                setAdverts(data.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });

        return () => {};
    }, [isLoggedIn, token, user]);

    return (
        <Container>
            {loading ? (
                <p>Loading...</p>
            ) : (
                user && (
                    <Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                alignItems: 'center',
                                marginBottom: '1.5rem',
                            }}
                        >
                            <Avatar sx={{ width: '100px', height: '100px' }}>
                                {user.username[0]}
                            </Avatar>
                            <Typography variant="h4">
                                {user.username}
                            </Typography>
                            <Typography variant="h5">{user.email}</Typography>
                            <Typography variant="h5">
                                {user.phoneNumber}
                            </Typography>
                        </Box>

                        {adverts.length === 0 && (
                            <>
                                <Alert severity="error">No adverts found</Alert>
                                <br />
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={() => router.push('/advert/new')}
                                >
                                    Create Advert
                                </Button>
                            </>
                        )}

                        {adverts.length > 0 && (
                            <Grid container spacing={2}>
                                {adverts.map((el: any) => (
                                    <Grid
                                        key={el.id}
                                        item
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        lg={3}
                                    >
                                        <ProductCard data={el} />
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Box>
                )
            )}
        </Container>
    );
};

export default ProfilePage;
