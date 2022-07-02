import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import qs from 'qs';
import { Container, Grid, Typography } from '@mui/material';
import keys from '../../config/config';
import ProductCard from '../../components/ui/ProductCard';

const SearchPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [adverts, setAdverts] = useState([]);

    const router = useRouter();

    console.log(router);

    const {
        query: { term },
    } = router;

    useEffect(() => {
        if (!term) router.push('/');
    }, [router, term]);

    const filterAdverts = useCallback(async () => {
        try {
            setLoading(true);
            const query = qs.stringify({
                populate: '*',
                filters: {
                    title: {
                        $containsi: term,
                    },
                },
            });
            const res = await fetch(`${keys.API_URL}/api/adverts?${query}`);
            if (!res.ok) {
                throw Error('Something went wrong');
            }
            const resData = await res.json();
            setAdverts(resData.data);
        } catch (error) {
            console.log(error);
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    }, [term]);

    useEffect(() => {
        filterAdverts();
    }, [router.query.term, filterAdverts]);

    return (
        <Container>
            {error && (
                <Typography sx={{ color: 'error.main' }}>{error}</Typography>
            )}

            {loading && <Typography>Loading...</Typography>}

            {adverts.length === 0 && <Typography>No adverts found</Typography>}

            {!loading && !error && adverts.length > 0 && (
                <Grid container spacing={2}>
                    {adverts.map((advert: any) => (
                        <Grid key={advert.id} item xs={12} sm={6} md={4} lg={3}>
                            <ProductCard data={advert} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default SearchPage;
