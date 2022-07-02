import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import qs from 'qs';
import { Alert, Container, Grid, Typography } from '@mui/material';
import ProductCard from '../../components/ui/ProductCard';

const CategoryPage = () => {
    const router = useRouter();

    const {
        query: { id },
    } = router;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [adverts, setAdverts] = useState<any[]>([]);

    useEffect(() => {
        setLoading(true);

        const query = qs.stringify({
            filters: {
                category: {
                    $eq: id,
                },
            },
            populate: '*',
        });

        fetch(`http://localhost:1337/api/adverts?${query}`)
            .then((res) => {
                if (!res.ok) {
                    console.log(res);
                    return setError('Something went wrong');
                }

                return res.json();
            })
            .then((data) => {
                setAdverts(data.data);
            })
            .catch((err) => {
                console.log(err);
                setError('Something went wrong');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    return (
        <Container>
            {loading && <Typography variant="body1">Loading...</Typography>}

            {error && <Typography variant="body1">{error}</Typography>}

            <Typography variant="h3">Category: {id}</Typography>

            <br />
            <br />

            <Typography variant="h6">Found: ({adverts.length})</Typography>
            
            <br />
            <br />

            {adverts.length === 0 && <Alert severity='error'>No adverts found</Alert>}

            {!loading && !error && adverts.length > 0 && (
                <Grid container spacing={2}>
                    {adverts.map((el) => (
                        <Grid key={el.id} item xs={12} sm={6} md={4} lg={3}>
                            <ProductCard data={el} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default CategoryPage;
