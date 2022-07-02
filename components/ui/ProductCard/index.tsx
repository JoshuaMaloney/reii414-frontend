import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Button, Chip } from '@mui/material';
import { useRouter } from 'next/router';

interface Props {
    data: any;
}

export default function ProductCard(props: Props) {
    const router = useRouter();

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="194"
                image={
                    'http://localhost:1337' +
                    props.data.attributes.images.data[0].attributes.formats
                        .thumbnail.url
                }
                alt="Paella dish"
            />

            <CardContent
                sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
            >
                <Typography variant="body1" color="text.secondary">
                    {props.data.attributes.title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    {props.data.attributes.description}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    Condition: {props.data.attributes.condition}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    R {props.data.attributes.price.toFixed(2)}
                </Typography>

                <Chip
                    label={props.data.attributes.category}
                    color="primary"
                    variant="outlined"
                />
            </CardContent>

            <CardActions disableSpacing>
                <Button
                    variant="text"
                    onClick={() => router.push(`/advert/${props.data.id}`)}
                >
                    View
                </Button>
            </CardActions>
        </Card>
    );
}
