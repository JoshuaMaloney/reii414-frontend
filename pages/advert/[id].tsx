import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
    Alert,
    Box,
    Button,
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import Image from 'next/image';
import qs from 'qs';
import { useRouter } from 'next/router';
import AuthContext from '../../context/authContext/authContext';
import keys from '../../config/config';
import CommentCard from '../../components/ui/CommentCard';

const AdvertPage = () => {
    const authCtx = useContext(AuthContext);
    const router = useRouter();

    const {
        query: { id },
    } = router;

    const [comment, setComment] = useState('');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [advert, setAdvert] = useState<any>(null);

    const fetchAdvert = useCallback(() => {
        setLoading(true);

        const query = qs.stringify({
            populate: ['images', 'creator', 'comments', 'comments.creator'],
        });

        fetch(`${keys.API_URL}/api/adverts/${id}?${query}`)
            .then((res) => {
                if (!res.ok) {
                    console.log(res);
                    return;
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setAdvert(data.data);
            })
            .catch((err) => {
                console.log(err);
                setError('Something went wrong');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        if (id) {
            fetchAdvert();
        }
    }, [fetchAdvert, id]);

    const handleSubmitComment = () => {
        if (comment.trim() !== '') {
            fetch(`${keys.API_URL}/api/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': ' application/json',
                    Authorization: 'Bearer ' + authCtx.token,
                },
                body: JSON.stringify({
                    data: {
                        body: comment,
                        advert: id,
                        creator: authCtx.user?.id,
                    },
                }),
            })
                .then((res) => {
                    if (!res.ok) {
                        console.log(res);
                        return;
                    }

                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    fetchAdvert();
                    setComment('');
                })
                .catch((err) => {
                    console.log(err);
                    setError('Something went wrong');
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const handleAdvertDelete = async () => {
        if (!confirm('Are you sure you want to delete?')) {
            return;
        }
        try {
            const res = await fetch(`${keys.API_URL}/api/adverts/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${authCtx.token}`,
                },
            });

            if (!res.ok) {
                throw Error('Something went wrong');
            }

            const resData = await res.json();

            console.log(resData);
            router.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteComment = async (commentId: number) => {
        try {
            const res = await fetch(
                `${keys.API_URL}/api/comments/${commentId}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${authCtx.token}`,
                    },
                }
            );

            if (!res.ok) {
                throw Error('Something went wrong');
            }

            fetchAdvert();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            {loading && <Typography>Loading...</Typography>}

            {error && (
                <Typography sx={{ color: 'error.main' }}>{error}</Typography>
            )}

            {!loading && !error && advert && (
                <>
                    {authCtx.user?.id === advert.attributes.creator.data.id && (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '1rem',
                                gap: '1rem',
                            }}
                        >
                            <Button
                                color="error"
                                variant="outlined"
                                onClick={handleAdvertDelete}
                            >
                                Delete
                            </Button>
                            <Button color="info" variant="outlined">
                                Edit
                            </Button>
                        </Box>
                    )}
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6} lg={8}>
                            <Box className="image-box">
                                <Image
                                    src={
                                        'http://localhost:1337' +
                                        advert.attributes.images.data[0]
                                            .attributes.url
                                    }
                                    alt="product image"
                                    width={1920}
                                    height={1080}
                                />
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <Typography
                                variant="h3"
                                sx={{ marginBottom: '0.5rem' }}
                            >
                                {advert.attributes.title}
                            </Typography>

                            <Typography
                                variant="body1"
                                sx={{ marginBottom: '1.5rem' }}
                            >
                                {advert.attributes.category}
                            </Typography>

                            <Typography
                                variant="h6"
                                sx={{ marginBottom: '1rem' }}
                            >
                                {advert.attributes.description}
                            </Typography>

                            <Typography
                                variant="body1"
                                sx={{ marginBottom: '1rem' }}
                            >
                                {advert.attributes.condition}
                            </Typography>

                            <Typography
                                variant="h5"
                                sx={{ marginBottom: '1rem' }}
                            >
                                R {advert.attributes.price.toFixed(2)}
                            </Typography>

                            <Button
                                fullWidth
                                variant="contained"
                                disabled={!authCtx.isLoggedIn}
                                onClick={() =>
                                    (location.href =
                                        'mailto:' +
                                        advert.attributes.creator.data
                                            .attributes.email +
                                        '?subject=' +
                                        'Hi, I am interested in this advert' +
                                        '&body=' +
                                        `Hi, I am ${authCtx.user?.username}. I am interested in your advert on REII414 E-Store advertId: ${advert.id}`)
                                }
                            >
                                Contact Seller
                            </Button>
                        </Grid>
                    </Grid>

                    <br />
                    <br />
                    <br />

                    <Box>
                        <Typography>Leave a comment</Typography>

                        <br />

                        {authCtx.isLoggedIn ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem',
                                    maxWidth: '500px',
                                }}
                            >
                                <TextField
                                    label="comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                <Button
                                    variant="contained"
                                    onClick={handleSubmitComment}
                                >
                                    Submit Comment
                                </Button>
                            </Box>
                        ) : (
                            <Alert severity="error">Login first</Alert>
                        )}

                        <br />
                        <br />
                        <br />

                        <Typography>
                            Comments: ({advert.attributes.comments.data.length})
                        </Typography>

                        <br />

                        {advert.attributes.comments.data.length === 0 ? (
                            <Alert severity="error"> No comments found</Alert>
                        ) : (
                            advert.attributes.comments.data.map((el: any) => (
                                <CommentCard
                                    key={el.id}
                                    data={el}
                                    handleDelete={() =>
                                        handleDeleteComment(el.id)
                                    }
                                />
                            ))
                        )}
                    </Box>
                </>
            )}
        </Container>
    );
};

export default AdvertPage;
